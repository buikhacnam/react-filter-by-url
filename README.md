![npm](https://img.shields.io/npm/v/react-filter-by-url)
![npm lisence](https://img.shields.io/npm/l/react-filter-by-url)
![npm type definitions](https://img.shields.io/npm/types/react-moralis)
![YouTube Channel Views](https://img.shields.io/youtube/channel/views/UCvdDJyJ8twY5EwVSOA8MwMg?style=social)

# react-filter-by-url


<img src="https://raw.githubusercontent.com/buikhacnam/buikhacnam/main/public/demo.gif" alt="" />

Live demo: https://react-filter-by-ulr-demo.vercel.app/list

You want to filter a list of items by a URL parameter in a Single Page Application (React):

```
https://example.com/search?page=2&type=public&status=open
```

By also call the API with the same parameters:

```
https://example.com/api/search?page=2&type=public&status=open
```

The list of items will be filterd automatically by:

- Paste in the link with the URL query parameters
- Change the URL query parameters in the browser
- Select Filter Options in the UI


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

The hook only requires to pass in a list of `params` that will be used to display in the browser url and call the API; and the `apiUrl`.

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

	return <></>
}
```

-   `apiQuery`: API url with the query string
-   `getDefaultParamValue`: get the default value of a param
-   `handleSelectFilter`: handle the select filter event in the UI


Try toggling around the filters in the UI by using `handleSelectFilter`:

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


## License

MIT License