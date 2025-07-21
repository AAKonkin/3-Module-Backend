// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Blog } from './Blog.jsx';
import { Provider } from 'react-redux';
import { store } from './store.js';
import './index.css';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Provider store={store}>
			<Blog />
		</Provider>
	</BrowserRouter>,
);
