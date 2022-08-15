![npm](https://img.shields.io/npm/v/react-filter-by-url)
![npm lisence](https://img.shields.io/npm/l/react-filter-by-url)
![npm type definitions](https://img.shields.io/npm/types/react-moralis)


# react-filter-by-url


<img src="https://raw.githubusercontent.com/buikhacnam/buikhacnam/main/public/ezgif.com-gif-maker.gif" alt="" />

### Try it now:

[![Edit bold-ellis-6rg1t](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/q4szr7?file=/src/DemoList.tsx)

Live demo: https://react-filter-by-ulr-demo.vercel.app/list


## Problem

This is the URL with query parameters in your browser address bar:

```
https://example.com/search?page=2&type=public&status=open
```

And you want to call an API with the exact same query parameters:

```
https://example.com/api/search?page=2&type=public&status=open
```

### API url with query parameters is updated automatically by:

- Paste in the link of the URL with query parameters to the address bar in browser
- Change the URL query parameters directly in the browser
- Update Filter Options in the UI

## useFilter

### Installation

```
yarn add react-filter-by-url react-router-dom
```

We use `react-router-dom` under the hood, so in the root file `index.tsx`, wrap the `<app />` with `<BrowserRouter>`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <Router>
        <App />
    </Router>
  </React.StrictMode>
)

```

### Implementation

```jsx
import { useUrlFilter } from 'react-filter-by-url'
```

```jsx
interface ListProps {}

const DemoList: React.FC<ListProps> = ({}) => {
	// api url
	const apiUrl = 'https://rickandmortyapi.com/api/character'

	// list of params to filter
	const params = ['page', 'status']

	const { apiQuery, getDefaultParamValue, handleSelectFilter } = useUrlFilter(
		params,
		apiUrl
	)

	return <>
		...
	</>
}
```

#### You will need to pass in this hook:

| Option          | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `params`       | An array of string, define all the query parameters the API has.                           | 
| `apiUrl` | A string, the base url of the API without the query parameters.           |


#### You will have access to the following values:


| Option          | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `apiQuery`       | A string, API url with the query parameters (same query parameters with browser).                            | 
| `getDefaultParamValue` | A function, get the default value of a query param.           |
| `handleSelectFilter`| A function, handle the change in the filter options in the UI.    	|
| `queryString`| A string, the recent query parameters.    	|



Try toggling around the filters in the UI by using `handleSelectFilter` to update the URL query parameters.:

```jsx
<select
	name='status'
	onChange={e =>
		handleSelectFilter(e.target.name, e.target.value)
	}
	defaultValue={getDefaultParamValue('status', '')}
>
	<option value=''>All</option>
	<option value='Alive'>Alive</option>
	<option value='Dead'>Dead</option>
	<option value='unknown'>unknown</option>
</select>
```

Then you can simply call API every time the `apiQuery` changes which means URL query parameters change.

```jsx
useEffect(() => {
	fetchApi()
}, [apiQuery])

const fetchApi = async () => {
	const response = await fetch(apiQuery)
	const data = await response.json()
}
```

Now you can try to change the URL query parameters in the browser or tinker around the filter UI and see the result.

Live demo: https://react-filter-by-ulr-demo.vercel.app/list


## License

MIT License