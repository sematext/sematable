# Sematable

Sematable wraps a table component, and provides:

 - filtering
 - sorting
 - row selection
 - pagination

... with the ability to persist the table state in application state with
Redux, so filters, sort info, selected rows, and pagination info survives route
navigations.

![](https://nodei.co/npm/sematable.png?downloads=true&downloadRank=true&stars=true)

## Reducer

Before using the sematable wrapper, you need to setup the reducer. You should
combine the provided reducer in your root reducer like this:

```javascript
import { reducer as sematable } from 'sematable';

const reducer = combineReducer({
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
  { key: 'id', header: 'ID', sortable: true, filterable: true, primaryKey: true },
  { key: 'name', header: 'Application', sortable: true, filterable: true },
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

AppsTableActions.js:
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
 - _sortable_ defines if user should be able to sort by this column
 - _filterable_ defines if user should be able to filter by this column (simple case-insensitive substring search)
 - _primaryKey_ defines if this column is the primary key
 - _hidden_ defines if we should hide this column (useful if you don't want to show primary key column)
 - _Component_ defines which component should be used to render cell contents

At least one column definition should have `primaryKey: true`.

## Advanced Usage

If you just need to show tabular data, with some actions for each row, you can
use the provided `Table` component in combination with the `sematable` wrapper
as shown above.  Otherwise, you can write the table structure yourself.

The `sematable(tableName, component, columns, configs)` wrapper accepts three parameters:

 - _tableName_ is a unique name for this table (used to store state)
 - _component_ is the table component you want to wrap
 - _columns_ is an array of column definitions
 - _configs_ is an optional object where you can specify configuration properties

Configuration properties:

 - _showPageSize_ if page size select should be shown
 - _showFilter_ if text filter field should be shown
 - _defaultPageSize_ overrides the default page size (if not specified 5 will be used)

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

const columns = {
  id: { header: 'ID', filterable: true, sortable: true, primaryKey: true },
  name: { header: 'Name', filterable: true, sortable: true },
};

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
getFilter
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
