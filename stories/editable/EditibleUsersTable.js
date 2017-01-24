import React, { Component } from 'react';
import sematable, { Table } from '../../src';
import EditibleCell from './EditibleCell.js';
import '../common/style.css';

export const EDITIBLE_USERS_TABLE = 'editibleUsersTable';

const columns = [
  { key: 'id', primaryKey: true, header: 'ID' },
  { key: 'firstName', header: 'First name', searchable: false, sortable: true },
  { key: 'lastName', header: 'Last name', searchable: false, sortable: true },
  { key: 'status', header: 'Status', sortable: true, searchable: false },
  {
    key: 'confirmed',
    header: 'Confirmed',
    Component: EditibleCell,
    filterable: true,
    getFilterTitle: (value) => value ? 'Confirmed' : 'Not confirmed'
  },
];

class EditibleUsersTable extends Component {
  render() {
    return <Table {...this.props} columns={columns} />;
  }
}
export default sematable(EDITIBLE_USERS_TABLE, EditibleUsersTable, columns);
