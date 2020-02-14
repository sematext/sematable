import _ from 'lodash';
import { createSelector } from 'reselect';
import { createValueFilter } from './common';

import { PAGE_SIZE_ALL_VALUE } from './PageSize';

function paginate(rows, { page, pageSize }) {
  if (pageSize < 1) {
    return rows.slice(0);
  }
  const start = page * pageSize;
  return rows.slice(start, start + pageSize);
}

/**
 * rows - original data
 * filters - list of selected filters
 * filterText - currently entered text in filter input
 * columns - column definitions
 */
function filter(rows = [], filters = [], filterText, columns) {
  let filteredRows = rows.slice(0);
  if (filters.length === 0 && !filterText) {
    return filteredRows;
  }

  const filtersArr = _.isArray(filters) ? filters : [filters];

  const textFilters = [
    ...(filterText ? [filterText.toLowerCase()] : []),
    ...filtersArr.filter(f => f.textFilter).map(f => f.value),
  ];

  const valueFilters = filtersArr.filter(f => f.valueFilter);

  // apply text filters across all columns
  if (textFilters.length > 0) {
    filteredRows = _.filter(rows, row => _.some(columns, (column) => {
      if (!column.searchable) {
        return false;
      }
      const normalized = String(_.get(row, column.key)).toLowerCase();
      return _.every(textFilters, f => normalized.indexOf(f) > -1);
    }));
  }

  // apply value filters on filterable columns
  if (valueFilters.length > 0) {
    const groups = _.groupBy(valueFilters, 'key');
    filteredRows = _.filter(filteredRows, row => _.every(
      groups,
      (groupFilters, groupKey) => {
        const value = _.get(row, groupKey);
        return _.some(groupFilters, f => f.value === value);
      }
    ));
  }

  return filteredRows;
}

function sort(rows, { sortKey, direction }) {
  const cloned = rows.slice(0);
  if (!sortKey) {
    return cloned;
  }

  return cloned.sort((a, b) => {
    let sortVal = 0;
    const valueA = _.get(a, sortKey);
    const valueB = _.get(b, sortKey);

    if (valueA > valueB || valueB === undefined) {
      sortVal = 1;
    } else if (valueA < valueB || valueA === undefined) {
      sortVal = -1;
    }

    if (direction === 'desc') {
      sortVal *= -1;
    }

    return sortVal;
  });
}

const selectors = {};

// wrapped in function as we use the same selectors for multiple tables
// if we don't wrap selectors like this, they would never memoize/cache results
// as we use it for multiple tables (each table has different state)
export default (tableName) => {
  if (selectors[tableName]) {
    return selectors[tableName];
  }

  const tableProp = (state, prop) => state.sematable[tableName] ?
    _.get(state.sematable[tableName], prop) : undefined;

  const tableOrComponentProp = (state, props, prop) => {
    if (props && props[prop] !== undefined) {
      return props[prop];
    }

    return state.sematable[tableName] ?
      _.get(state.sematable[tableName], prop) : undefined;
  };

  const getIsInitialized = (state) => state.sematable[tableName] !== undefined;
  const getInitialData = (state) => tableProp(state, 'initialData');
  const getEditing = (state) => tableProp(state, 'editing');
  const getFilter = (state) => tableProp(state, 'filter');
  const getFilterText = (state) => tableProp(state, 'filterText');
  const getColumns = (state) => tableProp(state, 'columns');
  const getPage = (state) => tableProp(state, 'page');
  const getPrimaryKey = (state) => tableProp(state, 'primaryKey');
  const getPageSize = (state, props) => tableOrComponentProp(state, props, 'pageSize');
  const getPageSizes = (state) => tableProp(state, 'pageSizes');
  const getUserSelection = (state) => tableProp(state, 'userSelection');
  const getSelectAll = (state) => tableProp(state, 'selectAll');
  const getSortInfo = (state) => ({
    sortKey: tableProp(state, 'sortKey'),
    direction: tableProp(state, 'direction'),
  });
  const getSelectEnabled = (state) => tableProp(state, 'configs.selectEnabled');
  const getFilterClassNamePrefix = (state) => tableProp(state, 'configs.filterClassNamePrefix');

  const getFiltered = createSelector(
    getInitialData,
    getFilter,
    getFilterText,
    getColumns,
    (initialData, filters, filterText, columns) => filter(
      initialData, filters, filterText, columns
    )
  );

  const getFilterOptions = createSelector(
    getInitialData,
    getColumns,
    (initialData, columns) => {
      const options = [];
      const columnMap = _.keyBy(columns, 'key');
      const values = {};

      // set predefined values
      columns.forEach(column => {
        if (column.filterable && column.filterValues) {
          values[column.key] = column.filterValues;
        }
      });

      // collect values for columns that don't have predefined values
      initialData.forEach(row => {
        columns.forEach(column => {
          if (!column.filterable || column.filterValues) {
            return;
          }
          if (!values[column.key]) {
            values[column.key] = [];
          }
          const columnValues = values[column.key];
          const value = _.get(row, column.key);
          if (!columnValues.includes(value)) {
            columnValues.push(value);
          }
        });
      });

      _.forOwn(values, (columnValues, key) => {
        columnValues.forEach(value => {
          const column = columnMap[key];
          options.push(createValueFilter(column, value));
        });
      });

      return options;
    }
  );

  const getPageInfo = createSelector(
    getPage,
    getPageSize,
    getFiltered,
    getPageSizes,
    (page, pageSize, filtered, pageSizes) => {
      if (pageSize === PAGE_SIZE_ALL_VALUE) {
        // we are showing all rows
        return {
          page,
          pageSize,
          pageSizes,
          pageCount: 1,
        };
      }
      const pageCount = Math.ceil(filtered.length / pageSize);
      // When initial data changes (and therefore filtered data), we might have
      // less data than before. If that's the case the current page value might
      // be invalid. We fix that by setting it to last page.
      let validPage = page;
      if (page > pageCount - 1) {
        validPage = pageCount - 1;
      }
      return {
        page: validPage,
        pageSize,
        pageSizes,
        pageCount,
      };
    }
  );

  const getSorted = createSelector(
    getFiltered,
    getSortInfo,
    (filtered, sortInfo) => sort(filtered, sortInfo)
  );

  const getVisible = createSelector(
    getSorted,
    getPageInfo,
    (sorted, pageInfo) => paginate(sorted, pageInfo)
  );

  const getSelectedRows = createSelector(
    getFiltered,
    getColumns,
    getUserSelection,
    getSelectAll,
    getPrimaryKey,
    getSelectEnabled,
    (filtered, columns, userSelection, selectAll, primaryKey, selectEnabled) => {
      const includesKey = (row) => _.includes(userSelection, _.get(row, primaryKey));

      if (selectAll) {
        let selectable = filtered;
        // if not all rows are selectable, apply selectEnabled function to filter selectable
        if (selectEnabled) {
          selectable = _.filter(selectable, selectEnabled);
        }
        if (_.isEmpty(userSelection)) {
          return selectable;
        }
        // when select all is enabled, userSelection acts as "not selected" rows
        return _.reject(selectable, includesKey);
      }

      // when select all is not enabled, userSelection acts as "selected" rows
      return _.filter(filtered, includesKey);
    }
  );
  const isTableEditing = createSelector(
    getEditing,
    editing => editing
  );

  selectors[tableName] = {
    getInitialData,
    getIsInitialized,
    getFilter,
    getFilterText,
    getColumns,
    getSortInfo,
    getPageInfo,
    getVisible,
    getSelectedRows,
    getSelectAll,
    getPrimaryKey,
    getFilterOptions,
    getFilterClassNamePrefix,
    getFiltered,
    isTableEditing,
  };

  return selectors[tableName];
};
