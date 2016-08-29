import React, { Component, PropTypes } from 'react';

const propTypes = {
  onSelectAllChange: PropTypes.func.isRequired,
  selectAll: PropTypes.bool.isRequired,
  selectedRows: PropTypes.array.isRequired,
};

class SelectAllHeader extends Component {
  render() {
    const {
      onSelectAllChange,
      selectedRows,
      selectAll,
    } = this.props;
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
