"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  onSelectAllChange: _react.PropTypes.func.isRequired,
  selectAll: _react.PropTypes.bool.isRequired,
  selectedRows: _react.PropTypes.array.isRequired,
  CheckboxComponent: _react.PropTypes.func
};

var SelectAllHeader = function (_Component) {
  _inherits(SelectAllHeader, _Component);

  function SelectAllHeader() {
    _classCallCheck(this, SelectAllHeader);

    return _possibleConstructorReturn(this, (SelectAllHeader.__proto__ || Object.getPrototypeOf(SelectAllHeader)).apply(this, arguments));
  }

  _createClass(SelectAllHeader, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          onSelectAllChange = _props.onSelectAllChange,
          selectedRows = _props.selectedRows,
          selectAll = _props.selectAll,
          CheckboxComponent = _props.CheckboxComponent;

      if (CheckboxComponent) {
        return _react2.default.createElement(
          "th",
          null,
          _react2.default.createElement(CheckboxComponent, {
            type: "checkbox",
            checked: selectAll,
            onChange: onSelectAllChange
          }),
          " ",
          _react2.default.createElement(
            "span",
            { className: "text-muted" },
            "(",
            selectedRows.length,
            ")"
          )
        );
      }
      return _react2.default.createElement(
        "th",
        null,
        _react2.default.createElement("input", {
          type: "checkbox",
          checked: selectAll,
          onChange: onSelectAllChange
        }),
        " ",
        _react2.default.createElement(
          "span",
          { className: "text-muted" },
          "(",
          selectedRows.length,
          ")"
        )
      );
    }
  }]);

  return SelectAllHeader;
}(_react.Component);

SelectAllHeader.propTypes = propTypes;
exports.default = SelectAllHeader;