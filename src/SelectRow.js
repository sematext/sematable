import React, { Component, PropTypes } from 'react';

const propTypes = {
  onRowCheckedChange: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  row: PropTypes.object.isRequired,
  isEnabled: PropTypes.func,
};

class SelectRow extends Component {
  render() {
    const {
      onRowCheckedChange,
      isSelected,
      isEnabled,
      row,
    } = this.props;
    const checked = isSelected(row);
    if (!isEnabled || isEnabled(row)) {
      return (
        <input
          type="checkbox"
          checked={checked}
          onChange={() =>
            onRowCheckedChange(row)
          }
        />
      );
    }
    return null;
  }
}

SelectRow.propTypes = propTypes;
export default SelectRow;
