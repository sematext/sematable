import _ from 'lodash';
import { handleActions } from 'redux-actions';
import {
  TABLE_INITIALIZE,
  TABLE_NEW_DATA,
  TABLE_PAGE_CHANGED,
  TABLE_PAGE_SIZE_CHANGED,
  TABLE_SORT_CHANGED,
  TABLE_FILTER_CHANGED,
  TABLE_FILTER_TEXT_CHANGED,
  TABLE_SELECT_ALL_CHANGED,
  TABLE_ROW_CHECKED_CHANGED,
  TABLE_DESTROY_STATE,
  TABLE_SET_FILTER,
} from './actions.js';
import { createTextFilter, createValueFilter } from './common';

const defaultState = (configs = {}) => ({
  page: 0,
  pageSize: configs.defaultPageSize || 5,
  filter: [],
  sortKey: null,
  direction: null,
  selectAll: false,
  userSelection: [],
  configs,
});

const behaviours = {
  [TABLE_INITIALIZE]: (state = {}, { payload }) => {
    const nextState = {
      ...defaultState(payload.configs),
      ...state,
      ...payload,
    };
    const primaryKeyCol = _.find(nextState.columns, 'primaryKey');
    if (!primaryKeyCol) {
      const msg = 'One column must be marked as primary with "primaryKey" for' +
                  ` data table ${nextState.tableName}.`;
      throw new Error(msg);
    }

    return {
      ...nextState,
      primaryKey: primaryKeyCol.key,
    };
  },
  [TABLE_NEW_DATA]: (state, { payload }) => ({
    ...state,
    initialData: payload.data,
  }),
  [TABLE_SET_FILTER]: (state, { payload }) => {
    const columnMap = _.keyBy(state.columns, 'key');
    const filter = payload.filterValue.map(f => {
      if (_.isString(f)) {
        return createTextFilter(f);
      }
      const column = columnMap[f.key];
      return createValueFilter(column, f.value);
    });
    return {
      ...state,
      filter,
    };
  },
  [TABLE_PAGE_CHANGED]: (state, { payload }) => ({
    ...state,
    page: payload.page,
  }),
  [TABLE_PAGE_SIZE_CHANGED]: (state, { payload }) => ({
    ...state,
    page: 0,
    pageSize: payload.pageSize,
  }),
  [TABLE_SORT_CHANGED]: (state, { payload }) => {
    const { sortKey, direction } = state;
    if (sortKey === payload.sortKey) {
      return {
        ...state,
        direction: direction === 'asc' ? 'desc' : 'asc',
      };
    }
    return {
      ...state,
      sortKey: payload.sortKey,
      direction: 'asc',
    };
  },
  [TABLE_FILTER_CHANGED]: (state, { payload }) => ({
    ...state,
    page: 0,
    filter: payload.filter,
    filterText: null,
  }),
  [TABLE_FILTER_TEXT_CHANGED]: (state, { payload }) => ({
    ...state,
    page: 0,
    filterText: payload.filterText,
  }),
  [TABLE_SELECT_ALL_CHANGED]: (state) => ({
    ...state,
    selectAll: !state.selectAll,
    userSelection: [],
  }),
  [TABLE_ROW_CHECKED_CHANGED]: (state, { payload }) => {
    const {
      userSelection,
      primaryKey,
    } = state;
    const { row } = payload;
    const idx = _.indexOf(userSelection, _.get(row, primaryKey));

    if (idx !== -1) {
      return {
        ...state,
        userSelection: [
          ...userSelection.slice(0, idx),
          ...userSelection.slice(idx + 1),
        ],
      };
    }
    return {
      ...state,
      userSelection: [
        ...userSelection,
        _.get(row, primaryKey),
      ],
    };
  },
  [TABLE_DESTROY_STATE]: (state) => ({
    ...state,
    ...defaultState(state.configs),
  }),
};

const tableReducer = handleActions(behaviours);

export default (state, action) => {
  if (!state) {
    return {};
  }

  if (_.has(behaviours, action.type)) {
    const { tableName } = action.payload;
    return {
      ...state,
      [tableName]: tableReducer(state[tableName], action),
    };
  }

  return state;
};
