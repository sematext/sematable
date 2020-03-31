import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import _ from 'lodash';
import SelectRow from './SelectRow';
import { editingChange } from './actions';
import makeSelectors from './selectors';

const propTypes = {
  selectable: PropTypes.bool,
  selectEnabled: PropTypes.func,
  row: PropTypes.object.isRequired,
  headers: PropTypes.object,
  columns: PropTypes.array.isRequired,
  CheckboxComponent: PropTypes.func,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  deleteTableRow: PropTypes.func,
  primaryKey: PropTypes.string,
  onEditingChange: PropTypes.func,
  isTableEditing: PropTypes.bool,
  isRowEmpty: PropTypes.func,
};

const mapDispatchToProps = (dispatch, { tableName }) => ({
  onEditingChange: (editing) => dispatch(editingChange(tableName, editing)),
});

const mapStateToProps = (state, props) => {
  const { tableName } = props;
  const selectors = makeSelectors(tableName);
  const isTableEditing = selectors.isTableEditing(state);
  return {
    isTableEditing,
  };
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
    const { editingRowId, value } = this.state;
    const { deleteTableRow, onEditingChange } = this.props;
    if (value === '') {
      deleteTableRow(editingRowId);
    }
    this.setState({ editingRowId: null });
    onEditingChange(false);
  }

  setInitialState() {
    let editingRow = null;
    let editingRowId = null;
    const { onEditingChange, editable, row, primaryKey, isRowEmpty } = this.props;
    if ((isRowEmpty && isRowEmpty(row)) && editable) {
      editingRow = row;
      editingRowId = row[primaryKey];
      onEditingChange(true);
    }
    return (
      { editingRow, editingRowId }
    );
  }

  saveCell(row) {
    this.props.onChange(row);
    this.setState({ editingRowId: null });
    this.props.onEditingChange(false);
  }

  editRow(cellValue, rowId, row) {
    this.props.onEditingChange(true);
    this.setState({
      editingRowId: rowId,
      editingRow: row,
      value: cellValue,
    });
  }

  renderCellContent(col, row, otherProps, editable) {
    const { isTableEditing } = this.props;
    if (row.id === this.state.editingRowId && col.EditComponent) {
      return (
        <col.EditComponent
          value={this.state.editingRow[col.key]}
          editingRow={this.state.editingRow}
          onChange={(e) => this.onCellChange(col.key, e.target.value)}
          {...resolveProps(row, col.editComponentProps, otherProps)}
        />
      );
    } else if (col.Component) {
      return (
        <col.Component
          row={row}
          key={col.key}
          className={cn({ editable })}
          onClick={() => (editable && !isTableEditing) &&
            this.editRow(_.get(row, col.key), row.id, row)}
          {...resolveProps(row, col.componentProps, otherProps)}
        >
          {_.get(row, col.key)}
        </col.Component>
      );
    }
    return (
      <div
        className={cn({ editable })}
        onClick={() => (editable && !isTableEditing)
          && this.editRow(_.get(row, col.key), row.id, row)}
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
      onClick,
      primaryKey,
      isTableEditing,
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
    const { editingRow, editingRowId } = this.state;
    const { isRowEmpty } = this.props;
    const isEditingClass = editingRowId ? 'editing' : null;
    const isSaveDisabled = isRowEmpty && isRowEmpty(editingRow);
    return (
      <React.Fragment>
        <tr
          className={className}
          onClick={onClick ? (() => { onClick(row); })
          : (editable && !isTableEditing) && (() => this.editRow(row[primaryKey], row.id, row))}
        >
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
            <td key="edit" colSpan={visibleColumns.length} className="isEditingClass">
              <button
                className="btn btn-primary"
                onClick={() => this.saveCell(this.state.editingRow)}
                disabled={isSaveDisabled}
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

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
