import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import SelectRow from './SelectRow';

const propTypes = {
  selectable: PropTypes.bool,
  selectEnabled: PropTypes.func,
  row: PropTypes.object.isRequired,
  headers: PropTypes.object,
  columns: PropTypes.array.isRequired,
  CheckboxComponent: PropTypes.func,
  rowClassResolver: PropTypes.func,
};

const resolveProps = (row, componentProps, tableProps) => {
  if (!componentProps) {
    return {};
  } else if (_.isFunction(componentProps)) {
    return componentProps(row, tableProps);
  } else if (_.isObject(componentProps)) {
    return componentProps;
  }
  throw new Error('componentProps should be object or function!');
};

const resolveRowClasses = ({ rowClassResolver, ...props }, classes) => {
  if (_.isFunction(rowClassResolver)) {
    return `${classes !== '' ? `${classes} ` : ''}${rowClassResolver(props)}`;
  }
  throw new Error('If provided, rowClassResolver must be a function!');
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
      rowClassResolver,
      ...otherProps
    } = this.props;
    const select = headers && headers.select;
    const visibleColumns = columns.filter((c) => !c.hidden);
    let className = '';

    if (selectable && !select) {
      throw new Error('`headers` must be provided with `headers.select` when `selectable` is true');
    }

    if (selectable && select.isSelected(row)) {
      className = 'table-info';
    }

    if (rowClassResolver) {
      className = resolveRowClasses(this.props, className);
    }

    return (
      <tr className={className}>
        {selectable &&
          <td key="select" style={{ width: '1%', whiteSpace: 'nowrap' }}>
            <SelectRow
              row={row}
              isEnabled={selectEnabled}
              CheckboxComponent={CheckboxComponent}
              {...select}
            />
          </td>
        }
        {visibleColumns.map((col) =>
          <td key={col.key} className={col.className}>
            {col.Component ?
              <col.Component
                row={row}
                key={col.key}
                {...resolveProps(row, col.componentProps, otherProps)}
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
