import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Creatable } from 'react-select';
import { createTextFilter } from './common';

const propTypes = {
  value: PropTypes.array,
  filterText: PropTypes.string,
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
    this.handleBlur = this.handleBlur.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { value, filterText, options } = this.props;
    if (nextProps.value !== value ||
        nextProps.options !== options ||
        nextProps.filterText !== filterText) {
      return true;
    }
    return false;
  }

  handleInputChange(text, { action }) {
    const { onTextChange } = this.props;
    // prevent blur from clearing text that wasn't confirmed with tab or enter
    if (action !== 'input-blur' && action !== 'menu-close') {
      onTextChange(text);
    }
  }

  handleBlur(e) {
    // preserve text on blur
    const { onTextChange } = this.props;
    const val = e.target.value;
    if (val !== '') {
      onTextChange(val);
    }
  }

  handleCreateOption(val) {
    const { onChange, value } = this.props;
    const opt = createTextFilter(val);
    onChange([...value, opt]);
  }

  render() {
    const {
      value,
      filterText,
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
        noOptionsMessage={() => 'Type text to search, press Enter to save as filter'}
        placeholder={placeholder || defaultPlaceholder}
        formatCreateLabel={txt => `Create '${txt}' filter`}
        isValidNewOption={input => !!input}
        onChange={selected => onChange(selected)}
        onInputChange={this.handleInputChange}
        onCreateOption={this.handleCreateOption}
        onBlur={this.handleBlur}
        value={value}
        inputValue={filterText || ''}
        isMulti
        style={style}
      />
    );
  }
}

Filter.propTypes = propTypes;
export default Filter;
