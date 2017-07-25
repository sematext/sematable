import React, { Component, PropTypes } from 'react';

const propTypes = {
  sortKey: PropTypes.string.isRequired,
  name: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
  sorted: PropTypes.string,
  title: PropTypes.string,
  sortAscIconClass: PropTypes.string,
  sortDescIconClass: PropTypes.string,
  sortIconClass: PropTypes.strings,
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
        {sorted === 'asc' && <i className={sortAscIconClass || 'fa fa-long-arrow-up'} />}
        {sorted === 'desc' && <i className={sortDescIconClass || 'fa fa-long-arrow-down'} />}
        {sorted === null && <i
          className={sortIconClass || 'fa fa-arrows-v'}
          style={{ color: '#ccc' }}
        />}
      </th>
    );
  }
}

SortableHeader.propTypes = propTypes;
export default SortableHeader;
