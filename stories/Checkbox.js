import React, { Component, PropTypes } from 'react';
require('./Checkbox.css');

const propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
};

class Checkbox extends Component {
  render() {
    const {
      checked,
      disabled,
      onChange,
      id,
    } = this.props;
    return (
      <div className="checkbox">
        <input
          disabled={disabled}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          id={id}
        />
        <label htmlFor={id}>
          <span />
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = propTypes;
export default Checkbox;
