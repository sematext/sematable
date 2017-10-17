import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';

const propTypes = {
  pageSize: PropTypes.number.isRequired,
  pageSizes: PropTypes.array.isRequired,
  totalSize: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  selectStyle: PropTypes.object,
  children: PropTypes.node,
};

export const PAGE_SIZE_ALL_VALUE = -1;

class PageSize extends Component {
  render() {
    const {
      pageSize,
      pageSizes,
      totalSize,
      onChange,
      className,
      style,
      selectStyle,
      children,
    } = this.props;
    return (
      <div
        className={className}
        style={style}
      >
        {children}
        <select
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          value={pageSize}
          className="form-control sema-field"
          style={selectStyle}
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
        <span
          className="sema-label"
          style={{ whiteSpace: 'nowrap' }}
        >
          {`${pageSize !== -1 ? ' of' : ''} ${totalSize}`}
        </span>
      </div>
    );
  }
}

PageSize.propTypes = propTypes;
export default PageSize;
