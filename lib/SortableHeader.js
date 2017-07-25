'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  sortKey: _react.PropTypes.string.isRequired,
  name: _react.PropTypes.node.isRequired,
  handleClick: _react.PropTypes.func.isRequired,
  sorted: _react.PropTypes.string,
  title: _react.PropTypes.string,
  sortAscIconClass: _react.PropTypes.string,
  sortDescIconClass: _react.PropTypes.string,
  sortIconClass: _react.PropTypes.strings
};

var SortableHeader = function (_Component) {
  _inherits(SortableHeader, _Component);

  function SortableHeader() {
    _classCallCheck(this, SortableHeader);

    return _possibleConstructorReturn(this, (SortableHeader.__proto__ || Object.getPrototypeOf(SortableHeader)).apply(this, arguments));
  }

  _createClass(SortableHeader, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          sortKey = _props.sortKey,
          name = _props.name,
          sorted = _props.sorted,
          title = _props.title,
          handleClick = _props.handleClick,
          sortAscIconClass = _props.sortAscIconClass,
          sortDescIconClass = _props.sortDescIconClass,
          sortIconClass = _props.sortIconClass;

      return _react2.default.createElement(
        'th',
        {
          'data-key': sortKey,
          'data-toggle': title ? 'tooltip' : '',
          style: {
            cursor: 'pointer'
          },
          title: title,
          onClick: function onClick() {
            return handleClick(sortKey);
          }
        },
        _react2.default.createElement(
          'span',
          { style: { marginRight: '5px' } },
          name
        ),
        sorted === 'asc' && _react2.default.createElement('i', { className: sortAscIconClass || 'fa fa-long-arrow-up' }),
        sorted === 'desc' && _react2.default.createElement('i', { className: sortDescIconClass || 'fa fa-long-arrow-down' }),
        sorted === null && _react2.default.createElement('i', {
          className: sortIconClass || 'fa fa-arrows-v',
          style: { color: '#ccc' }
        })
      );
    }
  }]);

  return SortableHeader;
}(_react.Component);

SortableHeader.propTypes = propTypes;
exports.default = SortableHeader;