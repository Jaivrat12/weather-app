import { useState } from "react";
import { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import { makeStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import LocationOnOutlined from "@material-ui/icons/LocationOnOutlined";

import { AnimatePresence } from 'framer-motion';

import Appbar from "./Components/Appbar";
import Home from "./Components/Home";
import ForecastDetails from "./Components/ForecastDetails";

import updateWeatherBG from "./Animations/BGAnims";

import { fetchData } from "./lib/fetchData";
import { capitalize } from "./lib/utilities";


const theme = responsiveFontSizes(createMuiTheme({

	typography: {
		fontFamily: 'Quicksand',
		fontWeightLight: 100,
		fontWeightRegular: 300,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	}
}));

const useStyles = makeStyles((theme) => ({

	title: {
		margin: '0.4em auto 0',
		padding: '0 0.8em',
		position: 'relative',
		width: 'fit-content',
		fontSize: '2.25em',
        [theme.breakpoints.up('sm')]: {
			marginTop: 0,
            fontSize: '3em',
        },
		fontWeight: 300,
	},
	locIcon: {
		position: 'absolute',
		height: '100%',
		left: 0,
		fontSize: '0.8em',
	},
	iconBtn: {
		position: 'absolute',
		marginLeft: '0.5rem',
        [theme.breakpoints.down('xs')]: {
			marginLeft: '0.2rem',
        },
	},
	icon: {
		fontSize: '2rem',
		color: 'white',
	},
}));

function App() {

	const classes = useStyles();
	const loc = useLocation();

	const [location, setLocation] = useState('Indore');
	const [currLocation, setCurrLocation] = useState(location);
	const [weatherData, setWeatherData] = useState(null);

	const [isLoading, setIsLoading] = useState(false);
    const [reqRefresh, setReqRefresh] = useState(null);

	const handleData = (data) => {

		console.log(data);
		setIsLoading(false);

		if(data !== null && data !== 404) {

			setCurrLocation(data.name);
			setWeatherData(data.weatherData);
			updateWeatherBG(data.weatherData.weather, data.weatherData.timezone_offset);
		}
	};

    const refreshData = () => {

		if(!isLoading) {

			setReqRefresh(Date());
			setLocation(currLocation);
		}
	};

	const handleSubmit = (e) => {

		e.preventDefault();

		e.target[0].value = e.target[0].value.trim();

		if(e.target[0].value === '')
			return;

		setLocation(e.target[0].value);
		e.target[0].value = '';
		document.querySelector('header').style.background = 'transparent';
	};

	useEffect(() => {

		setIsLoading(true);
		fetchData(location).then(data => handleData(data));
	}, [location, reqRefresh]);

	return (

		<ThemeProvider theme={ theme }>
			<Appbar
				handleSubmit={ handleSubmit }
				refreshData={ refreshData }
			/>
			<AnimatePresence exitBeforeEnter>
				<Switch location={ loc } key={ loc.key }>
					<Route exact path="/">
						<Typography
							variant="h4"
							className={ classes.title }
							gutterBottom
						>
							<LocationOnOutlined className={ classes.locIcon } />
							{ capitalize(currLocation) }
						</Typography>
						{ !isLoading && (

							<Home
								location={ currLocation }
								weatherData={ weatherData }
							/>
						)}
					</Route>
					
					<Route path="/hourly/*">
						<ForecastDetails
							weatherData={ weatherData && weatherData.hourly }
							dateFormat="date-time"
							cols={{ 
								xs: 5, sm: 3,
								md: 2, lg: 2,
							}}
						/>
					</Route>

					<Route path="/daily/*">
						<ForecastDetails
							weatherData={ weatherData && weatherData.daily }
							dateFormat="day-date"
							cols={{ 
								xs: 12, sm: 10,
								md: 8, lg: 6,
							}}
						/>
					</Route>
				</Switch>
			</AnimatePresence>
		</ThemeProvider>
	);
}

export default App;