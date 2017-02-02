import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import SelectRow from './SelectRow';

const propTypes = {
  selectable: PropTypes.bool,
  selectEnabled: PropTypes.func,
  row: PropTypes.object.isRequired,
  headers: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  CheckboxComponent: PropTypes.func,
};

const resolveProps = (row, componentProps) => {
  if (!componentProps) {
    return {};
  } else if (_.isFunction(componentProps)) {
    return componentProps(row);
  } else if (_.isObject(componentProps)) {
    return componentProps;
  }
  throw new Error('componentProps should be object or function!');
};

class TableRow extends Component {
  render() {
    const {
      row,
      selectable,
      selectEnabled,
      headers,
      columns,
      CheckboxComponent,
    } = this.props;
    const select = headers.select;
    const visibleColumns = columns.filter((c) => !c.hidden);
    let className = '';

    if (selectable && select.isSelected(row)) {
      className = 'table-info';
    }
    return (
      <tr className={className}>
        {selectable &&
          <td key="select">
            <SelectRow
              row={row}
              isEnabled={selectEnabled}
              CheckboxComponent={CheckboxComponent}
              {...select}
            />
          </td>
        }
        {visibleColumns.map((col) =>
          <td key={col.key}>
            {col.Component ?
              <col.Component
                row={row}
                key={col.key}
                {...resolveProps(row, col.componentProps)}
              >
                {_.get(row, col.key)}
              </col.Component> : _.get(row, col.key)
            }
          </td>
        )}
      </tr>
    );
  }
}
TableRow.propTypes = propTypes;

export default TableRow;
