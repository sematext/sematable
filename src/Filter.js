import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Creatable } from 'react-select';
import { createTextFilter } from './common';

const propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  className: PropTypes.string,
  hasFilterable: PropTypes.bool,
  placeholder: PropTypes.node,
  style: PropTypes.object,
};

class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreateOption = this.handleCreateOption.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { value, options } = this.props;
    if (nextProps.value !== value || nextProps.options !== options) {
      return true;
    }
    return false;
  }

  handleInputChange(text, { action }) {
    const { onTextChange } = this.props;
    // prevent blur from clearing text that wasn't confirmed with enter
    if (action !== 'input-blur' && action !== 'menu-close') {
      onTextChange(text);
    }
    return text;
  }

  handleCreateOption(val) {
    const { onChange } = this.props;
    const opt = createTextFilter(val);
    onChange(opt);
  }

  render() {
    const {
      value,
      onChange,
      options,
      className,
      hasFilterable,
      placeholder,
      style,
    } = this.props;
    const defaultPlaceholder = hasFilterable ? 'Search or filter using tags...' : 'Search...';
    return (
      <Creatable
        className={className}
        options={options}
        noOptionsMessage="Type text to search, press Enter to save as filter"
        placeholder={placeholder || defaultPlaceholder}
        formatCreateLabel={(txt) => `Search for '${txt}'`}
        onChange={(selected) => onChange(selected)}
        onInputChange={this.handleInputChange}
        onCreateOption={this.handleCreateOption}
        value={value}
        isMulti
        style={style}
      />
    );
  }
}

Filter.propTypes = propTypes;
export default Filter;
