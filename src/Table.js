import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import SortableHeader from './SortableHeader';
import SelectAllHeader from './SelectAllHeader';
import TableRow from './TableRow';

const propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  primaryKey: PropTypes.string.isRequired,
  selectable: PropTypes.bool,
  selectEnabled: PropTypes.func,
  className: PropTypes.string,
  styleName: PropTypes.string,
};

class Table extends Component {
  render() {
    const {
      selectable,
      data,
      headers,
      columns,
      primaryKey,
    } = this.props;
    const className = this.props.className || 'table-sm table-striped table-hover';
    const styleName = this.props.styleName || '';
    const visibleColumns = columns.filter((c) => !c.hidden);

    return (
      <div className="table-responsive">
        <table styleName={styleName} className={`table ${className}`}>
          <thead>
            <tr>
              {selectable &&
                <SelectAllHeader {...headers.select} />
              }
              {visibleColumns.map((col) => {
                if (col.sortable && !col.hidden) {
                  return (<SortableHeader key={col.key} {...headers[col.key]} />);
                }
                return (<th data-key={col.key} key={col.key}>{col.header}</th>);
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <TableRow key={_.get(row, primaryKey)} {...this.props} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = propTypes;
export default Table;
