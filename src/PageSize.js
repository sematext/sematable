import React, { Component, PropTypes } from 'react';

const propTypes = {
  pageSize: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

class PageSize extends Component {
  render() {
    const {
      pageSize,
      totalSize,
      onChange,
    } = this.props;
    return (
      <div
        className="Sema-page-size"
        style={{
          margin: '1rem 0 1rem 0',
        }}
      >
        <select
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          value={pageSize}
          className="form-control Sema-field"
          style={{
            display: 'inline-block',
            width: '80px',
            margin: '0 0 0 5px',
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={-1}>All</option>
        </select>
        <span className="Sema-label">{`${pageSize !== -1 && ' of'} ${totalSize}`}</span>
      </div>
    );
  }
}

PageSize.propTypes = propTypes;
export default PageSize;
