import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import ScrollToTop from './lib/ScrollToTop';
import App from './App';
import './index.css';

ReactDOM.render(

	<React.StrictMode>
		<Router>
			<ScrollToTop />
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);