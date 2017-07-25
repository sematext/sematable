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

var _SortableHeader = require('./SortableHeader');

var _SortableHeader2 = _interopRequireDefault(_SortableHeader);

var _SelectAllHeader = require('./SelectAllHeader');

var _SelectAllHeader2 = _interopRequireDefault(_SelectAllHeader);

var _TableRow = require('./TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _TableNoData = require('./TableNoData');

var _TableNoData2 = _interopRequireDefault(_TableNoData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  data: _react.PropTypes.array.isRequired,
  headers: _react.PropTypes.object.isRequired,
  columns: _react.PropTypes.array.isRequired,
  filter: _react.PropTypes.array.isRequired,
  primaryKey: _react.PropTypes.string.isRequired,
  selectable: _react.PropTypes.bool,
  selectEnabled: _react.PropTypes.func,
  className: _react.PropTypes.string,
  styleName: _react.PropTypes.string,
  CheckboxComponent: _react.PropTypes.func,
  NoDataComponent: _react.PropTypes.func
};

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table() {
    _classCallCheck(this, Table);

    return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
  }

  _createClass(Table, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          selectable = _props.selectable,
          data = _props.data,
          headers = _props.headers,
          columns = _props.columns,
          filter = _props.filter,
          primaryKey = _props.primaryKey,
          CheckboxComponent = _props.CheckboxComponent,
          NoDataComponent = _props.NoDataComponent;


      var className = this.props.className || 'table-sm table-striped table-hover';
      var visibleColumns = columns.filter(function (c) {
        return !c.hidden;
      });
      var visibleColumnsLength = visibleColumns.length;

      var NoDataContent = NoDataComponent || _TableNoData2.default;

      return _react2.default.createElement(
        'table',
        { className: 'table ' + className },
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            selectable && _react2.default.createElement(_SelectAllHeader2.default, _extends({}, headers.select, {
              CheckboxComponent: CheckboxComponent
            })),
            visibleColumns.map(function (col) {
              if (col.sortable && !col.hidden) {
                return _react2.default.createElement(_SortableHeader2.default, _extends({
                  key: col.key,
                  title: col.title
                }, headers[col.key]));
              }
              return _react2.default.createElement(
                'th',
                {
                  'data-key': col.key,
                  key: col.key,
                  title: col.title,
                  'data-toggle': col.title ? 'tooltip' : ''
                },
                col.header
              );
            })
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          data.map(function (row) {
            return _react2.default.createElement(_TableRow2.default, _extends({ key: _lodash2.default.get(row, primaryKey) }, _this2.props, { row: row }));
          }),
          !data.length && _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              { colSpan: selectable ? visibleColumnsLength + 1 : visibleColumnsLength },
              _react2.default.createElement(NoDataContent, { filter: filter })
            )
          )
        )
      );
    }
  }]);

  return Table;
}(_react.Component);

Table.propTypes = propTypes;
exports.default = Table;