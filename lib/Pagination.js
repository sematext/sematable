'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
  page: _react.PropTypes.number.isRequired,
  pageCount: _react.PropTypes.number.isRequired,
  pageSize: _react.PropTypes.number.isRequired,
  onPageChange: _react.PropTypes.func.isRequired,
  className: _react.PropTypes.string,
  autoHidePagination: _react.PropTypes.bool
};

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination() {
    _classCallCheck(this, Pagination);

    return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
  }

  _createClass(Pagination, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          page = _props.page,
          pageSize = _props.pageSize,
          className = _props.className,
          onPageChange = _props.onPageChange,
          autoHidePagination = _props.autoHidePagination;
      var pageCount = this.props.pageCount;

      var hasPrevious = page > 0;
      var hasNext = page < pageCount - 1;
      if (pageSize < 1) {
        pageCount = 1;
        hasPrevious = false;
        hasNext = false;
      }
      if (pageCount > 1 || !autoHidePagination) {
        return _react2.default.createElement(
          'nav',
          { className: className },
          _react2.default.createElement(
            'ul',
            { className: 'pagination pagination-sm' },
            _react2.default.createElement(
              'li',
              { className: 'page-item ' + (hasPrevious ? '' : 'disabled') },
              _react2.default.createElement(
                'a',
                {
                  href: '#previous',
                  className: 'page-link',
                  'aria-label': 'Previous',
                  onClick: function onClick(e) {
                    e.preventDefault();
                    if (hasPrevious) {
                      onPageChange(page - 1);
                    }
                  }
                },
                _react2.default.createElement(
                  'span',
                  { 'aria-hidden': 'true' },
                  '\xAB'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'sr-only' },
                  'Previous'
                )
              )
            ),
            _lodash2.default.times(pageCount, function (idx) {
              return _react2.default.createElement(
                'li',
                { key: idx, className: 'page-item ' + (idx === page ? 'active' : '') },
                _react2.default.createElement(
                  'a',
                  {
                    href: '#next',
                    className: 'page-link',
                    onClick: function onClick(e) {
                      e.preventDefault();
                      onPageChange(idx);
                    }
                  },
                  idx + 1
                )
              );
            }),
            _react2.default.createElement(
              'li',
              { className: 'page-item ' + (hasNext ? '' : 'disabled') },
              _react2.default.createElement(
                'a',
                {
                  href: '#page',
                  className: 'page-link',
                  'aria-label': 'Next',
                  onClick: function onClick(e) {
                    e.preventDefault();
                    if (hasNext) {
                      onPageChange(page + 1);
                    }
                  }
                },
                _react2.default.createElement(
                  'span',
                  { 'aria-hidden': 'true' },
                  '\xBB'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'sr-only' },
                  'Next'
                )
              )
            )
          )
        );
      }
      return null;
    }
  }]);

  return Pagination;
}(_react.Component);

Pagination.propTypes = propTypes;
exports.default = Pagination;