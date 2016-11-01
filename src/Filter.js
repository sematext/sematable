import React, { Component, PropTypes } from 'react';
import { Creatable } from 'react-select';

const propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

class Filter extends Component {
  render() {
    const {
      value,
      onChange,
      options,
    } = this.props;
    return (
      <Creatable
        options={options}
        noResultsText="No tags found, type text and press Enter to search"
        placeholder="Search by text or tags"
        promptTextCreator={(txt) => `Search for '${txt}'`}
        onChange={(selected) => onChange(selected)}
        newOptionCreator={({ label, labelKey, valueKey }) => {
          const option = {};
          option[valueKey] = label.toLowerCase();
          option[labelKey] = label.toLowerCase();
          option.textFilter = true;
          option.className = 'Select-create-option-placeholder';
          return option;
        }}
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
