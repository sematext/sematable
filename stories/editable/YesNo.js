import React, { PropTypes } from 'react';

const YesNo = ({ children }) => (
  <span>{children ? 'Yes' : 'No'}</span>
);

YesNo.propTypes = {
  children: PropTypes.bool.isRequired,
};
export default YesNo;
