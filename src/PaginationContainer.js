import React from 'react';
import { connect } from 'react-redux';
import makeSelectors from './selectors';
import { tablePageChanged } from './actions';
import Pagination from './Pagination';

const mapStateToProps = (state, { tableName }) => {
  const selectors = makeSelectors(tableName);
  const isInitialized = selectors.getIsInitialized(state);

  if (!isInitialized) {
    return {
      isInitialized,
    };
  }

  const pageInfo = selectors.getPageInfo(state);

  return {
    isInitialized,
    ...pageInfo,
  };
};

const mapDispatchToProps = (dispatch, { tableName }) => ({
  onPageChange: (page) => dispatch(tablePageChanged(tableName, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(({
  isInitialized,
  ...otherProps
}) => {
  if (!isInitialized) { return null; }
  return <Pagination {...otherProps} />;
});
