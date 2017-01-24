import React, { Component } from 'react';
import sematable, { Table } from '../../../src';
import YesNo from '../../common/YesNo.js';
import './css/bootstrap.min.css';


export const BOOTSTRAP_THREE_USERS_TABLE = 'bootstrapThreeUsersTable';
const columns = [
  { key: 'id', primaryKey: true, header: 'ID' },
  { key: 'firstName', header: 'First name', searchable: true, sortable: true },
  { key: 'lastName', header: 'Last name', searchable: true, sortable: true },
  {
    key: 'status',
    header: 'Status',
    filterable: true,
    filterValues: [
      'UNKNOWN',
      'ACTIVE',
      'DISABLED',
    ],
    getFilterTitle: (value) => ({
      UNKNOWN: 'Gone missing users',
      ACTIVE: 'Active users',
    }[value]),
    getFilterClassName: (value) => `col-${value.toLowerCase()}`,
  },
  {
    key: 'confirmed',
    header: 'Confirmed',
    Component: YesNo,
    filterable: true,
    getFilterTitle: (value) => value ? 'Confirmed' : 'Not confirmed',
  },
];

class BootstrapThreeUsersTable extends Component {
  render() {
    return <Table {...this.props} columns={columns} />;
  }
}
export default sematable(BOOTSTRAP_THREE_USERS_TABLE, BootstrapThreeUsersTable, columns);
