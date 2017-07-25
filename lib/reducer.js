'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _behaviours;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reduxActions = require('redux-actions');

var _actions = require('./actions.js');

var _common = require('./common');

var _PageSize = require('./PageSize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultState = function defaultState() {
  var configs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    page: 0,
    pageSize: configs.defaultPageSize || 5,
    pageSizes: configs.defaultPageSizes || [5, 10, 15, 20, 50, 100, _PageSize.PAGE_SIZE_ALL_VALUE],
    filter: [],
    filterText: null,
    sortKey: configs.sortKey,
    direction: configs.sortDirection || 'asc',
    selectAll: false,
    userSelection: [],
    configs: configs
  };
};

var filterValueToFilter = function filterValueToFilter() {
  var filterValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var columnMap = arguments[1];
  return filterValue.map(function (f) {
    if (_lodash2.default.isString(f)) {
      return (0, _common.createTextFilter)(f);
    }
    var column = columnMap[f.key];
    return (0, _common.createValueFilter)(column, f.value);
  });
};

var behaviours = (_behaviours = {}, _defineProperty(_behaviours, _actions.TABLE_INITIALIZE, function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = arguments[1];
  var payload = _ref.payload;

  var nextState = _extends({}, defaultState(payload.configs), state, payload);
  var primaryKeyCol = _lodash2.default.find(nextState.columns, 'primaryKey');
  var columnMap = _lodash2.default.keyBy(nextState.columns, 'key');
  var filter = filterValueToFilter(payload.filterValue, columnMap);
  if (!primaryKeyCol) {
    var msg = 'One column must be marked as primary with "primaryKey" for' + (' data table ' + nextState.tableName + '.');
    throw new Error(msg);
  }

  return _extends({}, nextState, {
    filter: filter,
    primaryKey: primaryKeyCol.key
  });
}), _defineProperty(_behaviours, _actions.TABLE_NEW_DATA, function (state, _ref2) {
  var payload = _ref2.payload;
  return _extends({}, state, {
    initialData: payload.data
  });
}), _defineProperty(_behaviours, _actions.TABLE_SET_FILTER, function (state, _ref3) {
  var payload = _ref3.payload;

  var columnMap = _lodash2.default.keyBy(state.columns, 'key');
  var filter = filterValueToFilter(payload.filterValue, columnMap);
  return _extends({}, state, {
    filter: filter
  });
}), _defineProperty(_behaviours, _actions.TABLE_PAGE_CHANGED, function (state, _ref4) {
  var payload = _ref4.payload;
  return _extends({}, state, {
    page: payload.page
  });
}), _defineProperty(_behaviours, _actions.TABLE_PAGE_SIZE_CHANGED, function (state, _ref5) {
  var payload = _ref5.payload;
  return _extends({}, state, {
    page: 0,
    pageSize: payload.pageSize
  });
}), _defineProperty(_behaviours, _actions.TABLE_SORT_CHANGED, function (state, _ref6) {
  var payload = _ref6.payload;
  var sortKey = state.sortKey,
      direction = state.direction;

  if (sortKey === payload.sortKey) {
    return _extends({}, state, {
      direction: direction === 'asc' ? 'desc' : 'asc'
    });
  }
  return _extends({}, state, {
    sortKey: payload.sortKey,
    direction: 'asc'
  });
}), _defineProperty(_behaviours, _actions.TABLE_FILTER_CHANGED, function (state, _ref7) {
  var payload = _ref7.payload;
  return _extends({}, state, {
    page: 0,
    filter: payload.filter,
    filterText: null
  });
}), _defineProperty(_behaviours, _actions.TABLE_FILTER_TEXT_CHANGED, function (state, _ref8) {
  var payload = _ref8.payload;
  return _extends({}, state, {
    page: 0,
    filterText: payload.filterText
  });
}), _defineProperty(_behaviours, _actions.TABLE_SELECT_ALL_CHANGED, function (state) {
  return _extends({}, state, {
    selectAll: !state.selectAll,
    userSelection: []
  });
}), _defineProperty(_behaviours, _actions.TABLE_ROW_CHECKED_CHANGED, function (state, _ref9) {
  var payload = _ref9.payload;
  var userSelection = state.userSelection,
      primaryKey = state.primaryKey;
  var row = payload.row;

  var idx = _lodash2.default.indexOf(userSelection, _lodash2.default.get(row, primaryKey));

  if (idx !== -1) {
    return _extends({}, state, {
      userSelection: [].concat(_toConsumableArray(userSelection.slice(0, idx)), _toConsumableArray(userSelection.slice(idx + 1)))
    });
  }
  return _extends({}, state, {
    userSelection: [].concat(_toConsumableArray(userSelection), [_lodash2.default.get(row, primaryKey)])
  });
}), _defineProperty(_behaviours, _actions.TABLE_DESTROY_STATE, function (state) {
  return _extends({}, state, defaultState(state.configs));
}), _behaviours);

var tableReducer = (0, _reduxActions.handleActions)(behaviours);

exports.default = function (state, action) {
  if (!state) {
    return {};
  }

  if (_lodash2.default.has(behaviours, action.type)) {
    var tableName = action.payload.tableName;

    return _extends({}, state, _defineProperty({}, tableName, tableReducer(state[tableName], action)));
  }

  return state;
};