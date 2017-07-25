'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PAGE_SIZE_ALL_VALUE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  pageSize: _react.PropTypes.number.isRequired,
  pageSizes: _react.PropTypes.array.isRequired,
  totalSize: _react.PropTypes.number.isRequired,
  onChange: _react.PropTypes.func.isRequired,
  className: _react.PropTypes.string
};

var PAGE_SIZE_ALL_VALUE = exports.PAGE_SIZE_ALL_VALUE = -1;

var PageSize = function (_Component) {
  _inherits(PageSize, _Component);

  function PageSize() {
    _classCallCheck(this, PageSize);

    return _possibleConstructorReturn(this, (PageSize.__proto__ || Object.getPrototypeOf(PageSize)).apply(this, arguments));
  }

  _createClass(PageSize, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          pageSize = _props.pageSize,
          pageSizes = _props.pageSizes,
          totalSize = _props.totalSize,
          _onChange = _props.onChange,
          className = _props.className;

      return _react2.default.createElement(
        'div',
        {
          className: className,
          style: {
            margin: '1rem 0 1rem 0'
          }
        },
        _react2.default.createElement(
          'select',
          {
            onChange: function onChange(e) {
              return _onChange(parseInt(e.target.value, 10));
            },
            value: pageSize,
            className: 'form-control sema-field',
            style: {
              display: 'inline-block',
              width: '80px',
              margin: '0 0 0 5px'
            }
          },
          _lodash2.default.map(pageSizes, function (size, i) {
            return _react2.default.createElement(
              'option',
              {
                value: size,
                key: i
              },
              size === PAGE_SIZE_ALL_VALUE ? 'All' : size
            );
          })
        ),
        _react2.default.createElement(
          'span',
          {
            className: 'sema-label',
            style: { whiteSpace: 'nowrap' }
          },
          (pageSize !== -1 ? ' of' : '') + ' ' + totalSize
        )
      );
    }
  }]);

  return PageSize;
}(_react.Component);

PageSize.propTypes = propTypes;
exports.default = PageSize;