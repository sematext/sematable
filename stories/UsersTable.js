import React, { Component } from 'react';
import sematable, { Table } from '../src';

export const USERS_TABLE = 'usersTable';
const columns = [
  { key: 'id', primaryKey: true, header: 'ID' },
  { key: 'firstName', header: 'First name', filterable: true, sortable: true },
  { key: 'lastName', header: 'Last name', filterable: true, sortable: true },
  { key: 'status', header: 'Status', taggable: true },
];

class UsersTable extends Component {
  render() {
    return <Table {...this.props} columns={columns} />;
  }
}
export default sematable(USERS_TABLE, UsersTable, columns);
