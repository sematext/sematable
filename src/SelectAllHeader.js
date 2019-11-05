import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  onSelectAllChange: PropTypes.func.isRequired,
  selectAll: PropTypes.bool.isRequired,
  selectedRows: PropTypes.array.isRequired,
  CheckboxComponent: PropTypes.func,
};

class SelectAllHeader extends Component {
  render() {
    const {
      onSelectAllChange,
      selectedRows,
      selectAll,
      CheckboxComponent,
    } = this.props;
    if (CheckboxComponent) {
      return (
        <th>
          <CheckboxComponent
            type="checkbox"
            checked={selectAll}
            onChange={onSelectAllChange}
          /> <span className="text-muted">({selectedRows.length})</span>
        </th>
      );
    }
    return (
      <th>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={onSelectAllChange}
        /> <span className="text-muted">({selectedRows.length})</span>
      </th>
    );
  }
}

SelectAllHeader.propTypes = propTypes;
export default SelectAllHeader;
