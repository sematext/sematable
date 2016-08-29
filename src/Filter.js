import React, { Component, PropTypes } from 'react';

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

class Filter extends Component {
  render() {
    const {
      value,
      onChange,
    } = this.props;
    return (
      <input
        className="form-control"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder="Filter data with any text"
        style={{
          margin: '1rem 0 1rem 0',
        }}
      />
    );
  }
}

Filter.propTypes = propTypes;
export default Filter;
