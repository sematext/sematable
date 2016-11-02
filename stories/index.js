import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { reducer as sematable, tableDestroyState } from '../src';
import UsersTable, { USERS_TABLE } from './UsersTable';

const reducer = combineReducers({ sematable });
const store = createStore(reducer);

const users = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    status: 'UNKNOWN',
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'McBobber',
    status: 'ACTIVE',
  },
];

storiesOf('Sematable', module)
  .add('default', () => (
    <Provider store={store}>
      <div className="container-fluid">
        <button
          className="btn btn-danger"
          onClick={() => {
            store.dispatch(tableDestroyState(USERS_TABLE));
          }}
        >
          Reset state
        </button>
        <UsersTable data={users} />
      </div>
    </Provider>
  ));
