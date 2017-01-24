import React, { PropTypes } from 'react';

const handleChange = (event) => {
  event.preventDefault(); 
  let value = event.target.value;
  console.log("EditibleUsersTable handleChange event.target: ", event.target.value);
  //
};

const EditableSimpleCell = ({ value }) => (
  <input type="text" value={value} onChange={handleChange} />
);

EditableSimpleCell.propTypes = {
  value: PropTypes.string.isRequired
};
export default EditableSimpleCell;