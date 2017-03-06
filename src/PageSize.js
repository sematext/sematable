import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

const propTypes = {
  pageSize: PropTypes.number.isRequired,
  pageSizes: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const PAGE_SIZE_ALL_VALUE = -1;

class PageSize extends Component {
  render() {
    const {
      pageSize,
      pageSizes,
      onChange,
      className,
    } = this.props;
    return (
      <div className={className}>
        <span className="sema-label">
          Show
        </span>
        <select
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          value={pageSize}
          className="form-control sema-field"
          style={{
            display: 'inline-block',
            width: '60px',
            height: '25px',
            margin: '0 0 0 5px',
          }}
        >
          {
            _.map(pageSizes, (size, i) => (
              <option
                value={size}
                key={i}
              >
                {size === PAGE_SIZE_ALL_VALUE ? 'All' : size}
              </option>
            ))
          }
        </select>
      </div>
    );
  }
}

PageSize.propTypes = propTypes;
export default PageSize;
