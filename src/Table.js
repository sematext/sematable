import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import cn from 'classnames';
import SortableHeader from './SortableHeader';
import SelectAllHeader from './SelectAllHeader';
import TableRow from './TableRow';
import TableNoData from './TableNoData';

const propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.object,
  columns: PropTypes.array.isRequired,
  filter: PropTypes.array.isRequired,
  primaryKey: PropTypes.string.isRequired,
  selectable: PropTypes.bool,
  editable: PropTypes.bool,
  selectEnabled: PropTypes.func,
  onChange: PropTypes.func,
  onRowClick: PropTypes.func,
  className: PropTypes.string,
  styleName: PropTypes.string,
  CheckboxComponent: PropTypes.func,
  NoDataComponent: PropTypes.func,
};

const resolveHeaderCondition = (col, tableProps) => {
  if (!col || !col.headerComponentVisible) {
    return false;
  } else if (_.isFunction(col.headerComponentVisible)) {
    return col.headerComponentVisible(tableProps);
  } else if (_.isBoolean(col.headerComponentVisible)) {
    return col.headerComponentVisible;
  }
  throw new Error('Header\'s headerComponentVisible should be a function or a boolean!');
};

const omitHeaderProps = props => _.omit(props, [
  'data',
  'filter',
  'primaryKey',
  'selectable',
  'selectEnabled',
  'className',
  'styleName',
  'CheckboxComponent',
  'NoDataComponent',
]);

class Table extends Component {

  render() {
    const {
      selectable,
      data,
      headers,
      columns,
      filter,
      primaryKey,
      CheckboxComponent,
      NoDataComponent,
      editable,
      onRowClick,
    } = this.props;
    const classNames = cn('table', this.props.className || 'table-sm table-striped table-hover',
    { editable });
    const visibleColumns = columns.filter((c) => !c.hidden);
    const visibleColumnsLength = visibleColumns.length;

    const NoDataContent = NoDataComponent || TableNoData;

    return (
      <table className={classNames}>
        {headers && (
          <thead>
            <tr>
              {selectable &&
                <SelectAllHeader
                  {...headers.select}
                  CheckboxComponent={CheckboxComponent}
                />
              }
              {visibleColumns.map((col) => {
                const { hidden, HeaderComponent, key, title } = col;
                if (!hidden && HeaderComponent && resolveHeaderCondition(col, this.props)) {
                  return (<th>
                    <col.HeaderComponent
                      {...omitHeaderProps(this.props)}
                      key={key}
                      title={title}
                    />
                  </th>);
                }
                if (col.sortable && !col.hidden) {
                  return (
                    <SortableHeader
                      key={col.key}
                      title={col.title}
                      {...headers[col.key]}
                    />);
                }
                return (
                  <th
                    data-key={col.key}
                    key={col.key}
                    title={col.title}
                    data-toggle={col.title ? 'tooltip' : ''}
                  >
                    {col.header}
                  </th>
                );
              })}
            </tr>
          </thead>
        )}
        <tbody>
          {data.map((row) => (
            <TableRow
              key={_.get(row, primaryKey)}
              {...this.props}
              row={row}
              onChange={(newRow) => this.props.onChange(newRow)}
              onClick={onRowClick}
            />
          ))}
          {!data.length &&
            <tr>
              <td colSpan={selectable ? visibleColumnsLength + 1 : visibleColumnsLength}>
                <NoDataContent filter={filter} />
              </td>
            </tr>
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = propTypes;
export default Table;
