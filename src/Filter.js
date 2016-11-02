import React, { Component, PropTypes } from 'react';
import { Creatable } from 'react-select';
import { createTextFilter } from './common';

const propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

class Filter extends Component {
  shouldComponentUpdate(nextProps) {
    const { value, options } = this.props;
    if (nextProps.value !== value || nextProps.options !== options) {
      return true;
    }
    return false;
  }

  render() {
    const {
      value,
      onChange,
      onTextChange,
      options,
    } = this.props;
    return (
      <Creatable
        options={options}
        noResultsText="Type text to search, press Enter to save as filter"
        placeholder="Search by text or tags"
        promptTextCreator={(txt) => `Search for '${txt}'`}
        onChange={(selected) => onChange(selected)}
        onInputChange={(text) => {
          onTextChange(text);
          return text;
        }}
        onBlurResetsInput={false}
        onCloseResetsInput={false}
        newOptionCreator={({ label }) => createTextFilter(label)}
        value={value}
        multi
        style={{
          margin: '1rem 0 1rem 0',
        }}
      />
    );
  }
}

Filter.propTypes = propTypes;
export default Filter;
