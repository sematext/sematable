'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _common = require('./common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  value: _react.PropTypes.array,
  onChange: _react.PropTypes.func.isRequired,
  onTextChange: _react.PropTypes.func.isRequired,
  options: _react.PropTypes.array.isRequired,
  className: _react.PropTypes.string,
  hasFilterable: _react.PropTypes.bool,
  placeholder: _react.PropTypes.node
};

var Filter = function (_Component) {
  _inherits(Filter, _Component);

  function Filter() {
    _classCallCheck(this, Filter);

    return _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).apply(this, arguments));
  }

  _createClass(Filter, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var _props = this.props,
          value = _props.value,
          options = _props.options;

      if (nextProps.value !== value || nextProps.options !== options) {
        return true;
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          value = _props2.value,
          _onChange = _props2.onChange,
          onTextChange = _props2.onTextChange,
          options = _props2.options,
          className = _props2.className,
          hasFilterable = _props2.hasFilterable,
          placeholder = _props2.placeholder;

      var defaultPlaceholder = hasFilterable ? 'Search or filter using tags...' : 'Search...';
      return _react2.default.createElement(_reactSelect.Creatable, {
        className: className,
        options: options,
        noResultsText: 'Type text to search, press Enter to save as filter',
        placeholder: placeholder || defaultPlaceholder,
        promptTextCreator: function promptTextCreator(txt) {
          return 'Search for \'' + txt + '\'';
        },
        onChange: function onChange(selected) {
          return _onChange(selected);
        },
        onInputChange: function onInputChange(text) {
          onTextChange(text);
          return text;
        },
        onBlurResetsInput: false,
        onCloseResetsInput: false,
        newOptionCreator: function newOptionCreator(_ref) {
          var label = _ref.label;
          return (0, _common.createTextFilter)(label);
        },
        value: value,
        multi: true,
        style: {
          margin: '1rem 0 1rem 0'
        }
      });
    }
  }]);

  return Filter;
}(_react.Component);

Filter.propTypes = propTypes;
exports.default = Filter;