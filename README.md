# Sematable

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

⛔️ DEPRECATED This repository isn't mantained by Sematext any more.

Sematable wraps a table component, and provides:

 - filtering by column value
 - search with text
 - sorting
 - row selection
 - pagination

... with the ability to persist the table state in application state with
Redux, so filters, sort info, selected rows, and pagination info survives route
navigations.

![image](https://cloud.githubusercontent.com/assets/497926/24330201/a156edec-1219-11e7-877b-e0c4c49fd947.png)

- [More About Sematable](https://sematext.com/blog/2016/12/07/reactjs-redux-table-sematable/)
- [Live Sematable examples](https://apps.sematext.com/demo)


### ⚠ CSS Dependencies

Sematable assumes that Bootstrap CSS, Font Awesome CSS, and react-select CSS are already loaded, so please make sure that's the case. Sematable should work with either Bootstrap 3 or Bootstrap 4. You can find the css for react-select in `node_modules/react-select/dist/react-select.css`.

## Reducer

Before using the sematable wrapper, you need to setup the reducer. You should
combine the provided reducer in your root reducer like this:

```javascript
import { reducer as sematable } from 'sematable';

const reducer = combineReducers({
  sematable,
  ...
});
```

## Usage

The most frequent use case for sematable is to show tabular data with some
actions (edit, delete, etc.). See the below example for that.

For information on how to get selected rows and other table state, check out
the [section about selectors](#selectors).

AppsTable.js:
```javascript
import React, { Component, PropTypes } from 'react';
import sematable, { Table } from 'sematable';
import AppsTableActions from './AppsTableActions';

const columns = [
  { key: 'id', header: 'ID', sortable: true, searchable: true, primaryKey: true },
  { key: 'name', header: 'Application', sortable: true, searchable: true },
  { key: 'token', header: 'Token' },
  { key: 'plan', header: 'Plan', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'actions', header: 'Actions', Component: AppsTableActions },
];

const propTypes = {
  headers: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  primaryKey: PropTypes.string.isRequired,
};

class AppsTable extends Component {
  render() {
    return (
      <Table
        {...this.props}
        selectable
        columns={columns}
      />
    );
  }
}

AppsTable.propTypes = propTypes;
export default sematable('allApps', AppsTable, columns);
```

`AppsTableActions.js`:
```javascript
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  row: PropTypes.object.isRequired,
};

class AppsTableActions extends Component {
  render() {
    const row = this.props.row;
    return (
      <Link to={`/settings/${row.id}`}>
        Settings
      </Link>
    );
  }
}
AppsTableActions.propTypes = propTypes;
export default AppsTableActions;
```

The `sematable` function will wrap your component and add filter, pagination,
and other sematable functionality. The first argument is name of this table. It
should be unique across your app. The second argument is your component, and
the third are the column definitions.

- You can omit the `selectable` property to hide the row selection controls.
- You can use the `className` property to set the table class (`table-sm table-striped table-hover` is the default).

Columns definitions have the following properties:

 - _key_ is the name of the property used in row objects
 - _header_ is the header label that will be used for this column
 - _title_ is the title that will be used when column header is hovered
 - _className_ is the css class to use for the column `<td>` element
 - _sortable_ defines if user should be able to sort by this column
 - _searchable_ defines if user should be able to text-search by this column (simple case-insensitive substring search)
 - _primaryKey_ defines if this column is the primary key
 - _hidden_ defines if we should hide this column (useful if you don't want to show primary key column)
 - _Component_ defines which component should be used to render cell contents
 - _filterable_ defines if user should be able to filter rows by distinct values of this column
 - _filterValues_ can be provided to define distinct filter values for this
   column. If not provided, unique values will be extracted from provided data.
 - _getFilterTitle_ is a function with `(value)` signature that can be provided to customize the filter title
 - _getFilterLabel_ is a function with `(value)` signature that can be provided to customize the filter label
 - _getFilterClassName_ is a function with `(value)` signature that can be provided to customize the filter css class

At least one column definition should have `primaryKey: true`.

Check out `stories/UsersTable.js` to see how these properties can be used.

## Advanced Usage

If you just need to show tabular data, with some actions for each row, you can
use the provided `Table` component in combination with the `sematable` wrapper
as shown above.  Otherwise, you can write the table structure yourself.

The `sematable(tableName, component, columns, configs)` wrapper accepts four parameters:

 - _tableName_ is a unique name for this table (used to store state)
 - _component_ is the table component you want to wrap
 - _columns_ is an array of column definitions
 - _configs_ is an optional object where you can specify configuration properties

### Showing page size and filter somewhere else

If you want to show the page size and filter somewhere else in your
application, you can use the provided PageSizeContainer, and FilterContainer
component. Like this:

```javascript
import { PageSizeContainer, FilterContainer } from 'sematable';

export default props => (
    <div>
      <FilterContainer tableName="myTable" />
      <PageSizeContainer tableName="myTable" />
    </div>
);
```

You can style these components with `style` or `className`.

### Configuration properties:

 - _plain_ if you want only the table component to be returned without page size, pagination, or filter (will not use bootstrap grid)
 - _showPageSize_ if page size select should be shown
 - _showFilter_ if text filter field should be shown
 - _defaultPageSize_ overrides the default page size (if not specified 5 will be used)
 - _autoHidePagination_ if pagination should be hidden if the number of pages is 1 (default is true, which means pagination is hidden if the number of pages is equal to 1)
 - _filterClassName_ css class for the filter component
 - _filterClassNamePrefix_ css class prefix forwarded to [react-select](https://react-select.com/styles#using-classnames) ('Select' by default)
 - _filterContainerClassName_ css class for the filter component container element ('col-md-6' by default)
 - _filterPlaceholder_ filter placeholder text
 - _pageSizeClassName_ css class for the page size component ('col-md-6' by default)
 - _pageSizeContainerClassName_ css class for the page size component container element ('col-md-6' by default)
 - _sortKey_ default column to sort by (not sorted by default)
 - _sortDirection_ default sort direction, `asc` or `desc` (`asc` by default)

There's no requirement that the wrapped component needs to be a table, it could
be a list, a div, an image gallery, or anything else.

We will pass the following props to the wrapped `component`:

 - _data_ is the filtered, sorted, and paginated data (the current view)
 - _headers_ contains callbacks for sorting and selection
 - _primaryKey_ is the name of the primary key field

Here's how you would implement the same example shown above without the
provided Table component.

AppsTable.js:
```javascript
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import sematable, {
  SortableHeader,
  SelectAllHeader,
  SelectRow,
} from 'sematable';

const columns = [
  { key: 'id', header: 'ID', searchable: true, sortable: true, primaryKey: true },
  { key: 'name', header: 'Name', searchable: true, sortable: true },
];

const propTypes = {
  headers: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

class AppsTable extends Component {
  render() {
    const {
      headers: { select, id, name },
      data,
    } = this.props;
    return (
      <div className="table-responsive">
        <table className="table table-sm table-striped table-hover">
          <thead>
            <tr>
              <SelectAllHeader {...select} />
              <SortableHeader {...id} />
              <SortableHeader {...name} />
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((app) => (
              <tr
                key={app.id}
                className={`${select.isSelected(app) ? 'table-info' : ''}`}
              >
                <td>
                  <SelectRow row={app} {...select} />
                </td>
                <td>{app.id}</td>
                <td>{app.name}</td>
                <td>
                  <Link to={`/settings/${app.id}`}>
                    Settings
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

AppsTable.propTypes = propTypes;
export default sematable('allApps', AppsTable, columns);
```

## Selectors

We provide a few selectors that can be useful when working with sematable:

```
getSelectedRows
getInitialData
getIsInitialized
getFiltered
getFilter
getFilterText
getColumns
getSortInfo
getPageInfo
getVisible
getSelectAll
getPrimaryKey
```

These are exposed with `makeSelectors(tableName)`. You should use them like
this:

```javascript
import { makeSelectors } from 'sematable';

const selectors = makeSelectors('myTable');
const mapStateToProps = (state) => ({
  selectedRows: selectors.getSelectedRows(state)
});
```

## Actions

You can use the below actions to alter the state of the table:

 - `tableDestroyState(tableName)` resets/destroys the current state of the
   table. This can be used in `componentWillUnmount()` to reset the related
   redux state.
 - `tableSetFilter(tableName, filterValue)` sets the table filters where
   `filterValue` is an array of filter objects.

You can import actions from the sematable module like this:

```javascript
import { tableDestroyState } from 'sematable';
```

## Filters

You can set the list of filters by passing `filterValue` to your sematable
component, or by using the `tableSetFilter` action. In either case, the
provided value should be an array of two types of objects:

 - text filter defined simply as a string
 - value filter defined as object with properties `key` and `value`, where
   `key` is the column key you want to filter, and `value` is the value you
   want to filter by.

For example:

```javascript
<UsersTable
  data={users}
  filterValue={[
    'Bob',
    { key: 'confirmed', value: true },
  ]}
/>
```
Or with `tableSetFilter`:

```javascript
dispatch(tableSetFilter('usersTable', [
  'Bob',
  { key: 'confirmed', value: true },
]));
```

## Custom components

`CheckboxComponent` for SelectAllHeader, accepting properties
```javascript
{
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
}
```

`NoDataComponent` for rendering custom messages when there is no data available, accepting properties:

```javascript
{
  filter: PropTypes.array // List of applied filters for table
}
```
