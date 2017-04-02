import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Pager from 'react-pager';

const propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  autoHidePagination: PropTypes.bool,
  visiblePages: PropTypes.number
};

class Pagination extends Component {
  render() {
    const {
      page,
      pageSize,
      onPageChange,
      autoHidePagination,
      visiblePages = 3
    } = this.props;
    let { pageCount } = this.props;
    let hasPrevious = page > 0;
    let hasNext = page < pageCount - 1;
    if (pageSize < 1) {
      pageCount = 1;
      hasPrevious = false;
      hasNext = false;
    }
    if (pageCount > 1 || !autoHidePagination) {
      return (
        <Pager
          total={pageCount}
          current={page}
          visiblePages={visiblePages}
          className="pagination-sm pull-right"
          onPageChanged={(newPage) => onPageChange(newPage)}
        />
      );
    }
    return null;
  }
}

Pagination.propTypes = propTypes;
export default Pagination;
