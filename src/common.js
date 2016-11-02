import _ from 'lodash';

export const createTextFilter = (text) => ({
  value: text.toLowerCase(),
  label: text.toLowerCase(),
  textFilter: true,
  className: 'Select-create-option-placeholder',
});

export const createValueFilter = (column, value) => {
  const {
    key,
    getFilterTitle = () => undefined,
    getFilterClassName = () => undefined,
    getFilterLabel = () => {
      let labelValue = value;
      if (_.isBoolean(value)) {
        labelValue = value ? 'Yes' : 'No';
      }
      return `${column.header}:${labelValue}`;
    },
  } = column;
  const title = getFilterTitle(value);
  const label = getFilterLabel(value);
  const className = getFilterClassName(value);
  return {
    key,
    label,
    value,
    title,
    className,
    valueFilter: true,
  };
};
