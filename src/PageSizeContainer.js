import React from 'react';
import { connect } from 'react-redux';
import makeSelectors from './selectors';
import { tablePageSizeChanged } from './actions';
import PageSize from './PageSize';

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
    pageSize: pageInfo.pageSize,
    pageSizes: pageInfo.pageSizes,
    value: selectors.getFilter(state),
    options: selectors.getFilterOptions(state),
    totalSize: selectors.getFiltered(state).length,
  };
};

const mapDispatchToProps = (dispatch, { tableName }) => ({
  onChange: (pageSize) => dispatch(tablePageSizeChanged(tableName, pageSize)),
});

export default connect(mapStateToProps, mapDispatchToProps)(({
  isInitialized,
  ...otherProps
}) => {
  if (!isInitialized) { return null; }
  return <PageSize {...otherProps} />;
});
