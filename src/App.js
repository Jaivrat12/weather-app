import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { createMuiTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";

import Appbar from "./Components/Appbar";
import Home from "./Components/Home";


const theme = responsiveFontSizes(createMuiTheme({

	typography: {
		// fontFamily: 'Quicksand',
		fontWeightLight: 100,
		fontWeightRegular: 300,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	}
}));

function App() {

	const [location, setLocation] = useState('Indore');

	const [locationIsError, setLocationIsError] = useState(false);
    const [reqRefresh, setReqRefresh] = useState(null)

    const refreshData = () => setReqRefresh(Date());

	const handleSubmit = (e) => {

		e.preventDefault();

		e.target[0].value = e.target[0].value.trim();

		if(e.target[0].value === '')
			return;

		setLocation(e.target[0].value);
		e.target[0].value = '';
	};

	return (

		<ThemeProvider theme={ theme }>
			<Router>
				<Appbar
					handleSubmit={ handleSubmit }
					locationIsError={ locationIsError }
					refreshData={ refreshData }
				/>
				<Switch>
					<Route exact path="/">
						<Home
							location={ location }
							setLocationIsError={ setLocationIsError }
							reqRefresh={ reqRefresh }
						/>
					</Route>
				</Switch>
			</Router>				
		</ThemeProvider>
	);
}

export default App;