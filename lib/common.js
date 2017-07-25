'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createValueFilter = exports.createTextFilter = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTextFilter = exports.createTextFilter = function createTextFilter(text) {
  return {
    value: text.toLowerCase(),
    label: text.toLowerCase(),
    textFilter: true,
    className: 'Select-create-option-placeholder'
  };
};

var createValueFilter = exports.createValueFilter = function createValueFilter(column, value) {
  var key = column.key,
      _column$getFilterTitl = column.getFilterTitle,
      getFilterTitle = _column$getFilterTitl === undefined ? function () {
    return undefined;
  } : _column$getFilterTitl,
      _column$getFilterClas = column.getFilterClassName,
      getFilterClassName = _column$getFilterClas === undefined ? function () {
    return undefined;
  } : _column$getFilterClas,
      _column$getFilterLabe = column.getFilterLabel,
      getFilterLabel = _column$getFilterLabe === undefined ? function () {
    var labelValue = value;
    if (_lodash2.default.isBoolean(value)) {
      labelValue = value ? 'Yes' : 'No';
    }
    return column.header + ':' + labelValue;
  } : _column$getFilterLabe;

  var title = getFilterTitle(value);
  var label = getFilterLabel(value);
  var className = getFilterClassName(value);
  return {
    key: key,
    label: label,
    value: value,
    title: title,
    className: className,
    valueFilter: true
  };
};