import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { reducer as sematable, tableDestroyState } from '../../../src';
import BootstrapThreeUsersTable, { BOOTSTRAP_THREE_USERS_TABLE } from './BootstrapThreeUsersTable';
import users from "../../common/users";

const reducer = combineReducers({ sematable });
const store = createStore(reducer);
const StoryBootstrapThree = () => (
    <Provider store={store}>
      <div className="container-fluid">
        <button
          className="btn btn-danger"
          onClick={() => {
            store.dispatch(tableDestroyState(BOOTSTRAP_THREE_USERS_TABLE));
          }}
        >
          Reset state
        </button>
        <BootstrapThreeUsersTable
          data={users}
          filterValue={[
            'o',
            { key: 'confirmed', value: true },
          ]}
        />
      </div>
    </Provider>
  )

export default StoryBootstrapThree;