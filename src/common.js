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
    getValueTitle = () => undefined,
    getValueClassName = () => undefined,
    getValueLabel = () => {
      let labelValue = value;
      if (_.isBoolean(value)) {
        labelValue = value ? 'Yes' : 'No';
      }
      return `${column.header}:${labelValue}`;
    },
  } = column;
  const title = getValueTitle(value);
  const label = getValueLabel(value);
  const className = getValueClassName(value);
  return {
    key,
    label,
    value,
    title,
    className,
    valueFilter: true,
  };
};
