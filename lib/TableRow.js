'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _SelectRow = require('./SelectRow');

var _SelectRow2 = _interopRequireDefault(_SelectRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  selectable: _react.PropTypes.bool,
  selectEnabled: _react.PropTypes.func,
  row: _react.PropTypes.object.isRequired,
  headers: _react.PropTypes.object.isRequired,
  columns: _react.PropTypes.array.isRequired,
  CheckboxComponent: _react.PropTypes.func
};

var resolveProps = function resolveProps(row, componentProps, tableProps) {
  if (!componentProps) {
    return {};
  } else if (_lodash2.default.isFunction(componentProps)) {
    return componentProps(row, tableProps);
  } else if (_lodash2.default.isObject(componentProps)) {
    return componentProps;
  }
  throw new Error('componentProps should be object or function!');
};

var TableRow = function (_Component) {
  _inherits(TableRow, _Component);

  function TableRow() {
    _classCallCheck(this, TableRow);

    return _possibleConstructorReturn(this, (TableRow.__proto__ || Object.getPrototypeOf(TableRow)).apply(this, arguments));
  }

  _createClass(TableRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          row = _props.row,
          selectable = _props.selectable,
          selectEnabled = _props.selectEnabled,
          headers = _props.headers,
          columns = _props.columns,
          CheckboxComponent = _props.CheckboxComponent,
          otherProps = _objectWithoutProperties(_props, ['row', 'selectable', 'selectEnabled', 'headers', 'columns', 'CheckboxComponent']);

      var select = headers.select;
      var visibleColumns = columns.filter(function (c) {
        return !c.hidden;
      });
      var className = '';

      if (selectable && select.isSelected(row)) {
        className = 'table-info';
      }
      return _react2.default.createElement(
        'tr',
        { className: className },
        selectable && _react2.default.createElement(
          'td',
          { key: 'select' },
          _react2.default.createElement(_SelectRow2.default, _extends({
            row: row,
            isEnabled: selectEnabled,
            CheckboxComponent: CheckboxComponent
          }, select))
        ),
        visibleColumns.map(function (col) {
          return _react2.default.createElement(
            'td',
            { key: col.key, className: col.className },
            col.Component ? _react2.default.createElement(
              col.Component,
              _extends({
                row: row,
                key: col.key
              }, resolveProps(row, col.componentProps, otherProps)),
              _lodash2.default.get(row, col.key)
            ) : _lodash2.default.get(row, col.key)
          );
        })
      );
    }
  }]);

  return TableRow;
}(_react.Component);

TableRow.propTypes = propTypes;

exports.default = TableRow;