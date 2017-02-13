import React, { Component } from 'react';
import sematable, { Table } from '../../src';
import EditableCell from './EditableCell.js';
import '../common/style.css';

export const EDITABLE_USERS_TABLE = 'editableUsersTable';

const columns = [
  { key: 'id', primaryKey: true, header: 'ID' },
  { key: 'firstName', header: 'First name', searchable: false, sortable: true },
  { key: 'lastName', header: 'Last name', searchable: false, sortable: true },
  { key: 'status', header: 'Status', sortable: true, searchable: false },
  {
    key: 'confirmed',
    header: 'Confirmed',
    Component: EditableCell,
    filterable: true,
    getFilterTitle: (value) => value ? 'Confirmed' : 'Not confirmed'
  },
];

class EditableUsersTable extends Component {
  render() {
    return <Table {...this.props} columns={columns} />;
  }
}
export default sematable(EDITABLE_USERS_TABLE, EditableUsersTable, columns);
