import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';

const propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  autoHidePagination: PropTypes.bool,
};

const pageItem = (idx, page, onPageChange) => (
  <li key={idx} className={`page-item ${idx === page ? 'active' : ''}`}>
    <a
      href="#next"
      className="page-link"
      onClick={(e) => {
        e.preventDefault();
        onPageChange(idx);
      }}
    >
      {idx + 1}
    </a>
  </li>
);

// shown pages: first, pagesBeforeCurrent, current, pagesAfterCurrent, last
const pagesBeforeCurrent = 5;
const pagesAfterCurrent = 5;
const currentPageRange = (page, pageCount) => {
  const rangeCount = Math.min(pageCount - 2, pagesBeforeCurrent + pagesAfterCurrent + 1);
  const firstPageMinValue = 1;
  const firstPageMaxValue = pageCount - 1 - rangeCount;
  let firstPage = page - pagesBeforeCurrent;
  firstPage = Math.max(firstPage, firstPageMinValue);
  firstPage = Math.min(firstPage, firstPageMaxValue);
  return _.range(firstPage, firstPage + rangeCount);
};

class Pagination extends Component {
  render() {
    const {
      page,
      pageSize,
      onPageChange,
      autoHidePagination,
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
        <nav>
          <ul className="pagination">
            <li className={`page-item ${hasPrevious ? '' : 'disabled'}`}>
              <a
                href="#previous"
                className="page-link"
                aria-label="Previous"
                onClick={(e) => {
                  e.preventDefault();
                  if (hasPrevious) {
                    onPageChange(page - 1);
                  }
                }}
              >
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            { pageItem(0, page, onPageChange) }
            { pageCount > 2 &&
                currentPageRange(page, pageCount).map(idx => pageItem(idx, page, onPageChange))
            }
            { pageCount > 1 && pageItem(pageCount - 1, page, onPageChange) }
            <li className={`page-item ${hasNext ? '' : 'disabled'}`}>
              <a
                href="#page"
                className="page-link"
                aria-label="Next"
                onClick={(e) => {
                  e.preventDefault();
                  if (hasNext) {
                    onPageChange(page + 1);
                  }
                }}
              >
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      );
    }
    return null;
  }
}

Pagination.propTypes = propTypes;
export default Pagination;
