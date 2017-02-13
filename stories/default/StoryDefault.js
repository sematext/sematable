import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { reducer as sematable, tableDestroyState } from '../../src';
import UsersTable, { USERS_TABLE } from '../common/UsersTable';
import users from "../common/users";

const reducer = combineReducers({ sematable });
const store = createStore(reducer);
const StoryDefault = () => (
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
        <UsersTable
          data={users}
          filterValue={[
            'o',
            { key: 'confirmed', value: true },
          ]}
        />
      </div>
    </Provider>
  )

export default StoryDefault;