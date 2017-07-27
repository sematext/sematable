import React, { Component, PropTypes } from 'react';

const propTypes = {
  sortKey: PropTypes.string.isRequired,
  name: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
  sorted: PropTypes.string,
  title: PropTypes.string,
  sortAscIconClass: PropTypes.string,
  sortDescIconClass: PropTypes.string,
  sortIconClass: PropTypes.string,
};

class SortableHeader extends Component {
  render() {
    const {
      sortKey,
      name,
      sorted,
      title,
      handleClick,
      sortAscIconClass,
      sortDescIconClass,
      sortIconClass,
    } = this.props;
    return (
      <th
        data-key={sortKey}
        data-toggle={title ? 'tooltip' : ''}
        style={{
          cursor: 'pointer',
        }}
        title={title}
        onClick={() => handleClick(sortKey)}
      >
        <span style={{ marginRight: '5px' }}>
          {name}
        </span>
        {sorted === 'asc' && <i className={sortAscIconClass} />}
        {sorted === 'desc' && <i className={sortDescIconClass} />}
        {sorted === null && <i
          className={sortIconClass}
          style={{ color: '#ccc' }}
        />}
      </th>
    );
  }
}

SortableHeader.propTypes = propTypes;
export default SortableHeader;
