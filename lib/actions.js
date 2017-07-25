'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TABLE_INITIALIZE = exports.TABLE_INITIALIZE = 'sematable/TABLE_INITIALIZE';
var TABLE_NEW_DATA = exports.TABLE_NEW_DATA = 'sematable/TABLE_NEW_DATA';
var TABLE_PAGE_CHANGED = exports.TABLE_PAGE_CHANGED = 'sematable/TABLE_PAGE_CHANGED';
var TABLE_PAGE_SIZE_CHANGED = exports.TABLE_PAGE_SIZE_CHANGED = 'sematable/TABLE_PAGE_SIZE_CHANGED';
var TABLE_FILTER_CHANGED = exports.TABLE_FILTER_CHANGED = 'sematable/TABLE_FILTER_CHANGED';
var TABLE_FILTER_TEXT_CHANGED = exports.TABLE_FILTER_TEXT_CHANGED = 'sematable/TABLE_FILTER_TEXT_CHANGED';
var TABLE_SORT_CHANGED = exports.TABLE_SORT_CHANGED = 'sematable/TABLE_SORT_CHANGED';
var TABLE_ROW_CHECKED_CHANGED = exports.TABLE_ROW_CHECKED_CHANGED = 'sematable/TABLE_ROW_CHECKED_CHANGED';
var TABLE_SELECT_ALL_CHANGED = exports.TABLE_SELECT_ALL_CHANGED = 'sematable/TABLE_SELECT_ALL_CHANGED';
var TABLE_DESTROY_STATE = exports.TABLE_DESTROY_STATE = 'sematable/TABLE_DESTROY_STATE';
var TABLE_SET_FILTER = exports.TABLE_SET_FILTER = 'sematable/TABLE_SET_FILTER';

var tableInitialize = exports.tableInitialize = function tableInitialize(tableName, initialData, columns, configs, filterValue) {
  return {
    type: TABLE_INITIALIZE,
    payload: {
      tableName: tableName,
      initialData: initialData,
      columns: columns,
      configs: configs,
      filterValue: filterValue
    }
  };
};

var tableNewData = exports.tableNewData = function tableNewData(tableName, data) {
  return {
    type: TABLE_NEW_DATA,
    payload: {
      tableName: tableName,
      data: data
    }
  };
};

var tablePageChanged = exports.tablePageChanged = function tablePageChanged(tableName, page) {
  return {
    type: TABLE_PAGE_CHANGED,
    payload: {
      tableName: tableName,
      page: page
    }
  };
};

var tablePageSizeChanged = exports.tablePageSizeChanged = function tablePageSizeChanged(tableName, pageSize) {
  return {
    type: TABLE_PAGE_SIZE_CHANGED,
    payload: {
      tableName: tableName,
      pageSize: pageSize
    }
  };
};

var tableFilterChanged = exports.tableFilterChanged = function tableFilterChanged(tableName, filter) {
  return {
    type: TABLE_FILTER_CHANGED,
    payload: {
      tableName: tableName,
      filter: filter
    }
  };
};

var tableFilterTextChanged = exports.tableFilterTextChanged = function tableFilterTextChanged(tableName, filterText) {
  return {
    type: TABLE_FILTER_TEXT_CHANGED,
    payload: {
      tableName: tableName,
      filterText: filterText
    }
  };
};

var tableSortChanged = exports.tableSortChanged = function tableSortChanged(tableName, sortKey) {
  return {
    type: TABLE_SORT_CHANGED,
    payload: {
      tableName: tableName,
      sortKey: sortKey
    }
  };
};

var tableRowCheckedChanged = exports.tableRowCheckedChanged = function tableRowCheckedChanged(tableName, row) {
  return {
    type: TABLE_ROW_CHECKED_CHANGED,
    payload: {
      tableName: tableName,
      row: row
    }
  };
};

var tableSelectAllChanged = exports.tableSelectAllChanged = function tableSelectAllChanged(tableName) {
  return {
    type: TABLE_SELECT_ALL_CHANGED,
    payload: {
      tableName: tableName
    }
  };
};

var tableDestroyState = exports.tableDestroyState = function tableDestroyState(tableName) {
  return {
    type: TABLE_DESTROY_STATE,
    payload: {
      tableName: tableName
    }
  };
};

var tableSetFilter = exports.tableSetFilter = function tableSetFilter(tableName, filterValue) {
  return {
    type: TABLE_SET_FILTER,
    payload: {
      tableName: tableName,
      filterValue: filterValue
    }
  };
};