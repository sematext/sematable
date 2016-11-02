export const TABLE_INITIALIZE = 'sematable/TABLE_INITIALIZE';
export const TABLE_NEW_DATA = 'sematable/TABLE_NEW_DATA';
export const TABLE_PAGE_CHANGED = 'sematable/TABLE_PAGE_CHANGED';
export const TABLE_PAGE_SIZE_CHANGED = 'sematable/TABLE_PAGE_SIZE_CHANGED';
export const TABLE_FILTER_CHANGED = 'sematable/TABLE_FILTER_CHANGED';
export const TABLE_FILTER_TEXT_CHANGED = 'sematable/TABLE_FILTER_TEXT_CHANGED';
export const TABLE_SORT_CHANGED = 'sematable/TABLE_SORT_CHANGED';
export const TABLE_ROW_CHECKED_CHANGED = 'sematable/TABLE_ROW_CHECKED_CHANGED';
export const TABLE_SELECT_ALL_CHANGED = 'sematable/TABLE_SELECT_ALL_CHANGED';
export const TABLE_DESTROY_STATE = 'sematable/TABLE_DESTROY_STATE';
export const TABLE_SET_FILTER = 'sematable/TABLE_SET_FILTER';

export const tableInitialize = (tableName, initialData, columns, configs) => ({
  type: TABLE_INITIALIZE,
  payload: {
    tableName,
    initialData,
    columns,
    configs,
  },
});

export const tableNewData = (tableName, data) => ({
  type: TABLE_NEW_DATA,
  payload: {
    tableName,
    data,
  },
});

export const tablePageChanged = (tableName, page) => ({
  type: TABLE_PAGE_CHANGED,
  payload: {
    tableName,
    page,
  },
});

export const tablePageSizeChanged = (tableName, pageSize) => ({
  type: TABLE_PAGE_SIZE_CHANGED,
  payload: {
    tableName,
    pageSize,
  },
});

export const tableFilterChanged = (tableName, filter) => ({
  type: TABLE_FILTER_CHANGED,
  payload: {
    tableName,
    filter,
  },
});

export const tableFilterTextChanged = (tableName, filterText) => ({
  type: TABLE_FILTER_TEXT_CHANGED,
  payload: {
    tableName,
    filterText,
  },
});

export const tableSortChanged = (tableName, sortKey) => ({
  type: TABLE_SORT_CHANGED,
  payload: {
    tableName,
    sortKey,
  },
});

export const tableRowCheckedChanged = (tableName, row) => ({
  type: TABLE_ROW_CHECKED_CHANGED,
  payload: {
    tableName,
    row,
  },
});

export const tableSelectAllChanged = (tableName) => ({
  type: TABLE_SELECT_ALL_CHANGED,
  payload: {
    tableName,
  },
});

export const tableDestroyState = (tableName) => ({
  type: TABLE_DESTROY_STATE,
  payload: {
    tableName,
  },
});

export const tableSetFilter = (tableName, filterValue) => ({
  type: TABLE_SET_FILTER,
  payload: {
    tableName,
    filterValue,
  },
});
