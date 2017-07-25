'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Filter = require('./Filter.js');

var _Filter2 = _interopRequireDefault(_Filter);

var _Pagination = require('./Pagination.js');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _PageSize = require('./PageSize.js');

var _PageSize2 = _interopRequireDefault(_PageSize);

var _selectors = require('./selectors.js');

var _selectors2 = _interopRequireDefault(_selectors);

var _actions = require('./actions.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  data: _react.PropTypes.array,

  isInitialized: _react.PropTypes.bool.isRequired,
  visibleRows: _react.PropTypes.array,
  filter: _react.PropTypes.array,
  sortInfo: _react.PropTypes.object,
  pageInfo: _react.PropTypes.object,
  selectAll: _react.PropTypes.bool,
  selectedRows: _react.PropTypes.array,
  primaryKey: _react.PropTypes.string,
  filterOptions: _react.PropTypes.array,
  filterValue: _react.PropTypes.array,

  onPageChange: _react.PropTypes.func.isRequired,
  onPageSizeChange: _react.PropTypes.func.isRequired,
  onFilterChange: _react.PropTypes.func.isRequired,
  onFilterTextChange: _react.PropTypes.func.isRequired,
  onHeaderClick: _react.PropTypes.func.isRequired,
  onInitialize: _react.PropTypes.func.isRequired,
  onNewData: _react.PropTypes.func.isRequired,
  onNewFilterValue: _react.PropTypes.func.isRequired,
  onRowCheckedChange: _react.PropTypes.func.isRequired,
  onSelectAllChange: _react.PropTypes.func.isRequired
};

/**
 * Wrapper for adding filter, sort and pagination for tabular data.
 *
 * See AppsTable.js and AppsPage.js on how to use the wrapper.
 *
 * When wrapping a table component, you need to provide the component itself,
 * and column definitions.  Column definitions should look like this:
 *
 *  {
 *    id: { header: 'ID', searchable: true },
 *    name: { header: 'Name', searchable: true },
 *  };
 *
 */
var sematable = function sematable(tableName, TableComponent, columns) {
  var configs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var selectors = (0, _selectors2.default)(tableName);

  var mapStateToProps = function mapStateToProps(state) {
    var isInitialized = selectors.getIsInitialized(state);
    if (!isInitialized) {
      return {
        isInitialized: isInitialized
      };
    }
    return {
      isInitialized: isInitialized,
      visibleRows: selectors.getVisible(state),
      filter: selectors.getFilter(state),
      sortInfo: selectors.getSortInfo(state),
      pageInfo: selectors.getPageInfo(state),
      selectAll: selectors.getSelectAll(state),
      selectedRows: selectors.getSelectedRows(state),
      primaryKey: selectors.getPrimaryKey(state),
      filterOptions: selectors.getFilterOptions(state)
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onPageChange: function onPageChange(page) {
        return dispatch((0, _actions.tablePageChanged)(tableName, page));
      },
      onPageSizeChange: function onPageSizeChange(pageSize) {
        return dispatch((0, _actions.tablePageSizeChanged)(tableName, pageSize));
      },
      onFilterChange: function onFilterChange(filter) {
        return dispatch((0, _actions.tableFilterChanged)(tableName, filter));
      },
      onFilterTextChange: function onFilterTextChange(filterText) {
        return dispatch((0, _actions.tableFilterTextChanged)(tableName, filterText));
      },
      onHeaderClick: function onHeaderClick(sortKey) {
        return dispatch((0, _actions.tableSortChanged)(tableName, sortKey));
      },
      onNewData: function onNewData(data) {
        return dispatch((0, _actions.tableNewData)(tableName, data));
      },
      onNewFilterValue: function onNewFilterValue(data) {
        return dispatch((0, _actions.tableSetFilter)(tableName, data));
      },
      onSelectAllChange: function onSelectAllChange() {
        return dispatch((0, _actions.tableSelectAllChanged)(tableName));
      },
      onRowCheckedChange: function onRowCheckedChange(row) {
        return dispatch((0, _actions.tableRowCheckedChanged)(tableName, row));
      },
      onInitialize: function onInitialize(data, filterValue) {
        return dispatch((0, _actions.tableInitialize)(tableName, data, columns, configs, filterValue));
      }
    };
  };

  var DataTable = function (_Component) {
    _inherits(DataTable, _Component);

    function DataTable() {
      _classCallCheck(this, DataTable);

      return _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).apply(this, arguments));
    }

    _createClass(DataTable, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _props = this.props,
            data = _props.data,
            filterValue = _props.filterValue,
            onInitialize = _props.onInitialize;

        onInitialize(data, filterValue);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var _props2 = this.props,
            data = _props2.data,
            filterValue = _props2.filterValue,
            onNewData = _props2.onNewData,
            onNewFilterValue = _props2.onNewFilterValue;


        if (data !== nextProps.data) {
          onNewData(nextProps.data);
        }

        if (filterValue !== nextProps.filterValue) {
          onNewFilterValue(nextProps.filterValue);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props3 = this.props,
            isInitialized = _props3.isInitialized,
            visibleRows = _props3.visibleRows,
            filter = _props3.filter,
            sortInfo = _props3.sortInfo,
            pageInfo = _props3.pageInfo,
            selectAll = _props3.selectAll,
            selectedRows = _props3.selectedRows,
            primaryKey = _props3.primaryKey,
            filterOptions = _props3.filterOptions,
            data = _props3.data,
            _onPageChange = _props3.onPageChange,
            onPageSizeChange = _props3.onPageSizeChange,
            onFilterChange = _props3.onFilterChange,
            onFilterTextChange = _props3.onFilterTextChange,
            onHeaderClick = _props3.onHeaderClick,
            onRowCheckedChange = _props3.onRowCheckedChange,
            onSelectAllChange = _props3.onSelectAllChange,
            otherProps = _objectWithoutProperties(_props3, ['isInitialized', 'visibleRows', 'filter', 'sortInfo', 'pageInfo', 'selectAll', 'selectedRows', 'primaryKey', 'filterOptions', 'data', 'onPageChange', 'onPageSizeChange', 'onFilterChange', 'onFilterTextChange', 'onHeaderClick', 'onRowCheckedChange', 'onSelectAllChange']);

        var _configs$showPageSize = configs.showPageSize,
            showPageSize = _configs$showPageSize === undefined ? true : _configs$showPageSize,
            _configs$showFilter = configs.showFilter,
            showFilter = _configs$showFilter === undefined ? true : _configs$showFilter,
            _configs$autoHidePagi = configs.autoHidePagination,
            autoHidePagination = _configs$autoHidePagi === undefined ? true : _configs$autoHidePagi,
            _configs$pageSizeCont = configs.pageSizeContainerClassName,
            pageSizeContainerClassName = _configs$pageSizeCont === undefined ? 'col-md-6' : _configs$pageSizeCont,
            _configs$filterContai = configs.filterContainerClassName,
            filterContainerClassName = _configs$filterContai === undefined ? 'col-md-6' : _configs$filterContai,
            _configs$paginationCo = configs.paginationContainerClassName,
            paginationContainerClassName = _configs$paginationCo === undefined ? 'col-md-12' : _configs$paginationCo,
            paginationClassName = configs.paginationClassName,
            pageSizeClassName = configs.pageSizeClassName,
            filterClassName = configs.filterClassName,
            filterPlaceholder = configs.filterPlaceholder;


        if (!isInitialized) {
          return _react2.default.createElement('div', null);
        }

        var isSelected = function isSelected(row) {
          return _lodash2.default.includes(selectedRows, row);
        };

        var select = {
          onRowCheckedChange: onRowCheckedChange,
          onSelectAllChange: onSelectAllChange,
          selectAll: selectAll,
          isSelected: isSelected,
          selectedRows: selectedRows
        };

        var columnMap = _lodash2.default.keyBy(columns, 'key');
        var hasFilterable = _lodash2.default.some(columns, 'filterable');
        var columnHeaders = _lodash2.default.mapValues(columnMap, function (value, key) {
          return {
            sorted: key === sortInfo.sortKey ? sortInfo.direction : null,
            sortKey: key,
            primaryKey: value.primaryKey,
            name: value.header,
            sortable: value.sortable,
            title: value.title,
            handleClick: function handleClick(k) {
              return onHeaderClick(k);
            }
          };
        });

        var headers = _extends({}, columnHeaders, {
          select: select
        });

        return _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: pageSizeContainerClassName },
            showPageSize && _react2.default.createElement(_PageSize2.default, {
              className: pageSizeClassName,
              pageSize: pageInfo.pageSize,
              pageSizes: pageInfo.pageSizes,
              totalSize: data.length,
              onChange: function onChange(f) {
                return onPageSizeChange(f);
              }
            })
          ),
          _react2.default.createElement(
            'div',
            { className: filterContainerClassName },
            showFilter && _react2.default.createElement(_Filter2.default, {
              className: filterClassName,
              value: filter,
              options: filterOptions,
              onChange: function onChange(f) {
                return onFilterChange(f);
              },
              onTextChange: function onTextChange(f) {
                return onFilterTextChange(f);
              },
              hasFilterable: hasFilterable,
              placeholder: filterPlaceholder
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-md-12' },
            _react2.default.createElement(TableComponent, _extends({}, otherProps, {
              data: visibleRows,
              headers: headers,
              primaryKey: primaryKey,
              columns: columns,
              filter: filter
            }, configs))
          ),
          _react2.default.createElement(
            'div',
            { className: paginationContainerClassName },
            _react2.default.createElement(_Pagination2.default, _extends({}, pageInfo, {
              className: paginationClassName,
              autoHidePagination: autoHidePagination,
              onPageChange: function onPageChange(p) {
                return _onPageChange(p);
              }
            }))
          )
        );
      }
    }]);

    return DataTable;
  }(_react.Component);

  DataTable.propTypes = propTypes;
  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DataTable);
};

exports.default = sematable;