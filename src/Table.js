import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import SortableHeader from './SortableHeader';
import SelectAllHeader from './SelectAllHeader';
import TableRow from './TableRow';
import TableNoData from './TableNoData';

const propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  filter: PropTypes.array.isRequired,
  primaryKey: PropTypes.string.isRequired,
  selectable: PropTypes.bool,
  selectEnabled: PropTypes.func,
  className: PropTypes.string,
  styleName: PropTypes.string,
  CheckboxComponent: PropTypes.func,
  NoDataComponent: PropTypes.func,
  sortAscIconClass: PropTypes.string,
  sortDescIconClass: PropTypes.string,
  sortIconClass: PropTypes.string,
};

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
      sortAscIconClass = 'fa fa-long-arrow-up',
      sortDescIconClass = 'fa fa-long-arrow-down',
      sortIconClass = 'fa fa-arrows-v',
    } = this.props;

    const className = this.props.className || 'table-sm table-striped table-hover';
    const visibleColumns = columns.filter((c) => !c.hidden);
    const visibleColumnsLength = visibleColumns.length;

    const NoDataContent = NoDataComponent || TableNoData;

    return (
      <table className={`table ${className}`}>
        <thead>
          <tr>
            {selectable &&
              <SelectAllHeader
                {...headers.select}
                CheckboxComponent={CheckboxComponent}
              />
            }
            {visibleColumns.map((col) => {
              if (col.sortable && !col.hidden) {
                return (
                  <SortableHeader
                    key={col.key}
                    title={col.title}
                    sortAscIconClass={sortAscIconClass}
                    sortDescIconClass={sortDescIconClass}
                    sortIconClass={sortIconClass}
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
        <tbody>
          {data.map((row) => (
            <TableRow key={_.get(row, primaryKey)} {...this.props} row={row} />
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
