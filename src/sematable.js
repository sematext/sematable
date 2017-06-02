import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Filter from './Filter.js';
import Pagination from './Pagination.js';
import PageSize from './PageSize.js';
import makeSelectors from './selectors.js';
import {
  tableInitialize,
  tableNewData,
  tablePageChanged,
  tablePageSizeChanged,
  tableFilterChanged,
  tableFilterTextChanged,
  tableSortChanged,
  tableRowCheckedChanged,
  tableSelectAllChanged,
  tableSetFilter,
} from './actions.js';

const propTypes = {
  data: PropTypes.array,

  isInitialized: PropTypes.bool.isRequired,
  visibleRows: PropTypes.array,
  filter: PropTypes.array,
  sortInfo: PropTypes.object,
  pageInfo: PropTypes.object,
  selectAll: PropTypes.bool,
  selectedRows: PropTypes.array,
  primaryKey: PropTypes.string,
  filterOptions: PropTypes.array,
  filterValue: PropTypes.array,

  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onFilterTextChange: PropTypes.func.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  onInitialize: PropTypes.func.isRequired,
  onNewData: PropTypes.func.isRequired,
  onNewFilterValue: PropTypes.func.isRequired,
  onRowCheckedChange: PropTypes.func.isRequired,
  onSelectAllChange: PropTypes.func.isRequired,
};

const arrayEquals = (array1, array2) => 
    array1 instanceof Array &&
    array2 instanceof Array &&
    array1.length === array2.length &&
    array1.every((element, index) => element === array2[index]);

/**
 * Wrapper for adding filter, sort and pagination for tabular data.
 *
 * See AppsTable.js and AppsPage.js on how to use the wrapper.
 *
 * When wrapping a table component, you need to provide the component itself,
 * and column definitions.  Column definitions should look like this:
 *
 *  {
 *    id: { header: 'ID', searchable: true },
 *    name: { header: 'Name', searchable: true },
 *  };
 *
 */
const sematable = (tableName, TableComponent, columns, configs = {}) => {
  const selectors = makeSelectors(tableName);

  const mapStateToProps = (state) => {
    const isInitialized = selectors.getIsInitialized(state);
    if (!isInitialized) {
      return {
        isInitialized,
      };
    }
    return {
      isInitialized,
      visibleRows: selectors.getVisible(state),
      filter: selectors.getFilter(state),
      sortInfo: selectors.getSortInfo(state),
      pageInfo: selectors.getPageInfo(state),
      selectAll: selectors.getSelectAll(state),
      selectedRows: selectors.getSelectedRows(state),
      primaryKey: selectors.getPrimaryKey(state),
      filterOptions: selectors.getFilterOptions(state),
    };
  };

  const mapDispatchToProps = (dispatch) => ({
    onPageChange: (page) => dispatch(tablePageChanged(tableName, page)),
    onPageSizeChange: (pageSize) => dispatch(tablePageSizeChanged(tableName, pageSize)),
    onFilterChange: (filter) => dispatch(tableFilterChanged(tableName, filter)),
    onFilterTextChange: (filterText) => dispatch(tableFilterTextChanged(tableName, filterText)),
    onHeaderClick: (sortKey) => dispatch(tableSortChanged(tableName, sortKey)),
    onNewData: (data) => dispatch(tableNewData(tableName, data)),
    onNewFilterValue: (data) => dispatch(tableSetFilter(tableName, data)),
    onSelectAllChange: () => dispatch(tableSelectAllChanged(tableName)),
    onRowCheckedChange: (row) => dispatch(tableRowCheckedChanged(tableName, row)),
    onInitialize: (data, filterValue) =>
      dispatch(tableInitialize(tableName, data, columns, configs, filterValue)),
  });

  class DataTable extends Component {
    componentWillMount() {
      const { data, filterValue, onInitialize } = this.props;
      onInitialize(data, filterValue);
    }

    componentWillReceiveProps(nextProps) {
      const {
        data,
        filterValue,
        onNewData,
        onNewFilterValue,
      } = this.props;

      if (data !== nextProps.data && !arrayEquals(data, nextProps.data)) {
        onNewData(nextProps.data);
      }

      if (filterValue !== nextProps.filterValue && !arrayEquals(filterValue, nextProps.filterValue)) {
        onNewFilterValue(nextProps.filterValue);
      }
    }

    render() {
      const {
        /* props */
        isInitialized,
        visibleRows,
        filter,
        sortInfo,
        pageInfo,
        selectAll,
        selectedRows,
        primaryKey,
        filterOptions,
        data,

        /* actions */
        onPageChange,
        onPageSizeChange,
        onFilterChange,
        onFilterTextChange,
        onHeaderClick,
        onRowCheckedChange,
        onSelectAllChange,
        ...otherProps
      } = this.props;
      const {
        showPageSize = true,
        showFilter = true,
        autoHidePagination = true,
        pageSizeContainerClassName = 'col-md-6',
        filterContainerClassName = 'col-md-6',
        pageSizeClassName,
        filterClassName,
        filterPlaceholder,
      } = configs;

      if (!isInitialized) {
        return (<div />);
      }

      const isSelected = (row) => _.includes(selectedRows, row);

      const select = {
        onRowCheckedChange,
        onSelectAllChange,
        selectAll,
        isSelected,
        selectedRows,
      };

      const columnMap = _.keyBy(columns, 'key');
      const hasFilterable = _.some(columns, 'filterable');
      const columnHeaders = _.mapValues(columnMap, (value, key) => ({
        sorted: key === sortInfo.sortKey ? sortInfo.direction : null,
        sortKey: key,
        primaryKey: value.primaryKey,
        name: value.header,
        sortable: value.sortable,
        title: value.title,
        handleClick: (k) => onHeaderClick(k),
      }));

      const headers = {
        ...columnHeaders,
        select,
      };

      return (
        <div className="row">
          <div className={pageSizeContainerClassName}>
            {showPageSize && <PageSize
              className={pageSizeClassName}
              pageSize={pageInfo.pageSize}
              pageSizes={pageInfo.pageSizes}
              totalSize={data.length}
              onChange={(f) => onPageSizeChange(f)}
            />}
          </div>
          <div className={filterContainerClassName}>
            {showFilter && <Filter
              className={filterClassName}
              value={filter}
              options={filterOptions}
              onChange={(f) => onFilterChange(f)}
              onTextChange={(f) => onFilterTextChange(f)}
              hasFilterable={hasFilterable}
              placeholder={filterPlaceholder}
            />}
          </div>
          <div className="col-md-12">
            <TableComponent
              {...otherProps}
              data={visibleRows}
              headers={headers}
              primaryKey={primaryKey}
              columns={columns}
              filter={filter}
              {...configs}
            />
          </div>
          <div className="col-md-12">
            <Pagination
              {...pageInfo}
              autoHidePagination={autoHidePagination}
              onPageChange={(p) => onPageChange(p)}
            />
          </div>
        </div>
      );
    }
  }

  DataTable.propTypes = propTypes;
  return connect(mapStateToProps, mapDispatchToProps)(DataTable);
};

export default sematable;
