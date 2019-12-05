import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cn from 'classnames';
import _ from 'lodash';
import SelectRow from './SelectRow';

const propTypes = {
  selectable: PropTypes.bool,
  selectEnabled: PropTypes.func,
  row: PropTypes.object.isRequired,
  headers: PropTypes.object,
  columns: PropTypes.array.isRequired,
  CheckboxComponent: PropTypes.func,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
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

class TableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      ...this.setInitialState(),
    };
  }

  onCellChange(key, value) {
    this.setState(prevState => ({
      editingRow: {
        ...prevState.editingRow,
        [key]: value,
      },
    }));
  }

  onCancelEdit() {
    this.setState({ editingRowId: null });
  }

  setInitialState() {
    let editingRow = null;
    let editingRowId = null;
    for (const [, value] of Object.entries(this.props.row)) {
      if (value === '') {
        editingRow = this.props.row;
        editingRowId = this.props.row.id;
      }
    }
    return (
      { editingRow, editingRowId }
    );
  }

  saveCell(row) {
    this.props.onChange(row);
    this.setState({ editingRowId: null });
  }

  editRow(cellValue, rowId, row) {
    this.setState({
      editingRowId: rowId,
      editingRow: row,
      value: cellValue,
    });
  }

  renderCellContent(col, row, otherProps, editable) {
    if (row.id === this.state.editingRowId && col.EditComponent) {
      return (
        <col.EditComponent
          value={this.state.editingRow[col.key]}
          onChange={(e) => this.onCellChange(col.key, e.target.value)}
        />
      );
    } else if (col.Component) {
      return (
        <col.Component
          row={row}
          key={col.key}
          {...resolveProps(row, col.componentProps, otherProps)}
        >
          {_.get(row, col.key)}
        </col.Component>
      );
    }
    return (
      <div
        className={cn({ editable })}
        onClick={() => editable && this.editRow(_.get(row, col.key), row.id, row)}
      >
        {_.get(row, col.key)}
      </div>
    );
  }
  render() {
    const {
      row,
      selectable,
      selectEnabled,
      headers,
      columns,
      editable,
      CheckboxComponent,
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
    const isEditingClass = this.state.editingRowId ? 'editing' : null;
    return (
      <React.Fragment>
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
          {visibleColumns.map((col) => (
            <td
              key={col.key}
              className={cn(col.className, { isEditingClass })}
            >
              {this.renderCellContent(col, row, otherProps, editable && col.EditComponent)}
            </td>))}
        </tr>
        {this.state.editingRowId &&
          <tr>
            <td colSpan={visibleColumns.length} className="isEditingClass">
              <button
                className="btn btn-primary"
                onClick={() => this.saveCell(this.state.editingRow)}
              >Save</button>
              <button
                className="btn btn-secundary"
                onClick={() => this.onCancelEdit()}
              >Cancel</button>
            </td>
          </tr>
        }
      </React.Fragment>
    );
  }
}
TableRow.propTypes = propTypes;

export default TableRow;
