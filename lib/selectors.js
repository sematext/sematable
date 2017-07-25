'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reselect = require('reselect');

var _common = require('./common');

var _PageSize = require('./PageSize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function paginate(rows, _ref) {
  var page = _ref.page,
      pageSize = _ref.pageSize;

  if (pageSize < 1) {
    return rows.slice(0);
  }
  var start = page * pageSize;
  return rows.slice(start, start + pageSize);
}

/**
 * rows - original data
 * filters - list of selected filters
 * filterText - currently entered text in filter input
 * columns - column definitions
 */
function filter() {
  var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var filterText = arguments[2];
  var columns = arguments[3];

  var filteredRows = rows.slice(0);
  if (filters.length === 0 && !filterText) {
    return filteredRows;
  }

  var textFilters = [].concat(_toConsumableArray(filterText ? [filterText.toLowerCase()] : []), _toConsumableArray(filters.filter(function (f) {
    return f.textFilter;
  }).map(function (f) {
    return f.value;
  })));

  var valueFilters = filters.filter(function (f) {
    return f.valueFilter;
  });

  // apply text filters across all columns
  if (textFilters.length > 0) {
    filteredRows = _lodash2.default.filter(rows, function (row) {
      return _lodash2.default.some(columns, function (column) {
        if (!column.searchable) {
          return false;
        }
        var normalized = String(_lodash2.default.get(row, column.key)).toLowerCase();
        return _lodash2.default.every(textFilters, function (f) {
          return normalized.indexOf(f) > -1;
        });
      });
    });
  }

  // apply value filters on filterable columns
  if (valueFilters.length > 0) {
    var groups = _lodash2.default.groupBy(valueFilters, 'key');
    filteredRows = _lodash2.default.filter(filteredRows, function (row) {
      return _lodash2.default.every(groups, function (groupFilters, groupKey) {
        var value = _lodash2.default.get(row, groupKey);
        return _lodash2.default.some(groupFilters, function (f) {
          return f.value === value;
        });
      });
    });
  }

  return filteredRows;
}

function sort(rows, _ref2) {
  var sortKey = _ref2.sortKey,
      direction = _ref2.direction;

  var cloned = rows.slice(0);
  if (!sortKey) {
    return cloned;
  }

  return cloned.sort(function (a, b) {
    var sortVal = 0;
    var valueA = _lodash2.default.get(a, sortKey);
    var valueB = _lodash2.default.get(b, sortKey);

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

// wrapped in function as we use the same selectors for multiple tables
// if we don't wrap selectors like this, they would never memoize/cache results
// as we use it for multiple tables (each table has different state)

exports.default = function (tableName) {
  var tableProp = function tableProp(state, prop) {
    return state.sematable[tableName] ? _lodash2.default.get(state.sematable[tableName], prop) : undefined;
  };

  var getIsInitialized = function getIsInitialized(state) {
    return state.sematable[tableName] !== undefined;
  };
  var getInitialData = function getInitialData(state) {
    return tableProp(state, 'initialData');
  };
  var getFilter = function getFilter(state) {
    return tableProp(state, 'filter');
  };
  var getFilterText = function getFilterText(state) {
    return tableProp(state, 'filterText');
  };
  var getColumns = function getColumns(state) {
    return tableProp(state, 'columns');
  };
  var getPage = function getPage(state) {
    return tableProp(state, 'page');
  };
  var getPrimaryKey = function getPrimaryKey(state) {
    return tableProp(state, 'primaryKey');
  };
  var getPageSize = function getPageSize(state) {
    return tableProp(state, 'pageSize');
  };
  var getPageSizes = function getPageSizes(state) {
    return tableProp(state, 'pageSizes');
  };
  var getUserSelection = function getUserSelection(state) {
    return tableProp(state, 'userSelection');
  };
  var getSelectAll = function getSelectAll(state) {
    return tableProp(state, 'selectAll');
  };
  var getSortInfo = function getSortInfo(state) {
    return {
      sortKey: tableProp(state, 'sortKey'),
      direction: tableProp(state, 'direction')
    };
  };
  var getSelectEnabled = function getSelectEnabled(state) {
    return tableProp(state, 'configs.selectEnabled');
  };

  var getFiltered = (0, _reselect.createSelector)(getInitialData, getFilter, getFilterText, getColumns, function (initialData, filters, filterText, columns) {
    return filter(initialData, filters, filterText, columns);
  });

  var getFilterOptions = (0, _reselect.createSelector)(getInitialData, getColumns, function (initialData, columns) {
    var options = [];
    var columnMap = _lodash2.default.keyBy(columns, 'key');
    var values = {};

    // set predefined values
    columns.forEach(function (column) {
      if (column.filterable && column.filterValues) {
        values[column.key] = column.filterValues;
      }
    });

    // collect values for columns that don't have predefined values
    initialData.forEach(function (row) {
      columns.forEach(function (column) {
        if (!column.filterable || column.filterValues) {
          return;
        }
        if (!values[column.key]) {
          values[column.key] = [];
        }
        var columnValues = values[column.key];
        var value = _lodash2.default.get(row, column.key);
        if (!columnValues.includes(value)) {
          columnValues.push(value);
        }
      });
    });

    _lodash2.default.forOwn(values, function (columnValues, key) {
      columnValues.forEach(function (value) {
        var column = columnMap[key];
        options.push((0, _common.createValueFilter)(column, value));
      });
    });

    return options;
  });

  var getPageInfo = (0, _reselect.createSelector)(getPage, getPageSize, getFiltered, getPageSizes, function (page, pageSize, filtered, pageSizes) {
    if (pageSize === _PageSize.PAGE_SIZE_ALL_VALUE) {
      // we are showing all rows
      return {
        page: page,
        pageSize: pageSize,
        pageSizes: pageSizes,
        pageCount: 1
      };
    }
    var pageCount = Math.ceil(filtered.length / pageSize);
    // When initial data changes (and therefore filtered data), we might have
    // less data than before. If that's the case the current page value might
    // be invalid. We fix that by setting it to last page.
    var validPage = page;
    if (page > pageCount - 1) {
      validPage = pageCount - 1;
    }
    return {
      page: validPage,
      pageSize: pageSize,
      pageSizes: pageSizes,
      pageCount: pageCount
    };
  });

  var getSorted = (0, _reselect.createSelector)(getFiltered, getSortInfo, function (filtered, sortInfo) {
    return sort(filtered, sortInfo);
  });

  var getVisible = (0, _reselect.createSelector)(getSorted, getPageInfo, function (sorted, pageInfo) {
    return paginate(sorted, pageInfo);
  });

  var getSelectedRows = (0, _reselect.createSelector)(getFiltered, getColumns, getUserSelection, getSelectAll, getPrimaryKey, getSelectEnabled, function (filtered, columns, userSelection, selectAll, primaryKey, selectEnabled) {
    var includesKey = function includesKey(row) {
      return _lodash2.default.includes(userSelection, _lodash2.default.get(row, primaryKey));
    };

    if (selectAll) {
      var selectable = filtered;
      // if not all rows are selectable, apply selectEnabled function to filter selectable
      if (selectEnabled) {
        selectable = _lodash2.default.filter(selectable, selectEnabled);
      }
      if (_lodash2.default.isEmpty(userSelection)) {
        return selectable;
      }
      // when select all is enabled, userSelection acts as "not selected" rows
      return _lodash2.default.reject(selectable, includesKey);
    }

    // when select all is not enabled, userSelection acts as "selected" rows
    return _lodash2.default.filter(filtered, includesKey);
  });

  return {
    getInitialData: getInitialData,
    getIsInitialized: getIsInitialized,
    getFilter: getFilter,
    getColumns: getColumns,
    getSortInfo: getSortInfo,
    getPageInfo: getPageInfo,
    getVisible: getVisible,
    getSelectedRows: getSelectedRows,
    getSelectAll: getSelectAll,
    getPrimaryKey: getPrimaryKey,
    getFilterOptions: getFilterOptions
  };
};