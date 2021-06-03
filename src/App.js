import { useState } from "react";
import { Switch, Route } from "react-router-dom";

import { createMuiTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";


import Appbar from "./Components/Appbar";
import Home from "./Components/Home";
import ForecastDetails from "./Components/ForecastDetails";


const theme = responsiveFontSizes(createMuiTheme({

	typography: {
		fontFamily: 'Quicksand',
		fontWeightLight: 100,
		fontWeightRegular: 300,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	}
}));

function App() {

	const [location, setLocation] = useState('Indore');
	const [currLocation, setCurrLocation] = useState(location);
	// const [weatherData, setWeatherData] = useState(null);

	const [locationIsError, setLocationIsError] = useState(false);
    const [reqRefresh, setReqRefresh] = useState(null)

    const refreshData = () => setReqRefresh(Date());

	const setData = (data) => {

		setLocationIsError(false);
		setCurrLocation(data.name);
	};

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
				<Appbar
					handleSubmit={ handleSubmit }
					locationIsError={ locationIsError }
					refreshData={ refreshData }
				/>
				<Switch>

					<Route exact path="/">
						<Home
							location={ location }
							currLocation={ currLocation }
							setData={ setData }
							reqRefresh={ reqRefresh }
							setLocationIsError={ setLocationIsError }
						/>
					</Route>
					
					<Route path="/hourly/*">
						<ForecastDetails
							dateFormat="date-time"
							cols={{ 
								xs: 5, sm: 3,
								md: 2, lg: 2,
							}}
						/>
					</Route>

					<Route path="/daily/*">
						<ForecastDetails
							dateFormat="day-date"
							cols={{ 
								xs: 12, sm: 10,
								md: 8, lg: 6,
							}}
						/>
					</Route>

				</Switch>				
		</ThemeProvider>
	);
}

export default App;