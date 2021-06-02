import { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

import LocationOnOutlined from "@material-ui/icons/LocationOnOutlined";

import CurrentWeather from "./CurrentWeather";
import { capitalize } from "../Utilities/utilities";
import ForecastOverview from "./ForecastOverview";


// Use Combo box for suggestions
// And add a Cleanup function
const getData = async (location) => {

	let endpoint = 'https://api.openweathermap.org/geo/1.0/direct?q=';
	const appID = '&appid=cad8852b13cf2ae06dc0303a9c81ac0c';

	let url = endpoint + location + appID + '&limit=5';

	let response = await fetch(url);
	if(!response.ok) {

		console.log('Something went wrong!');
		return null;
	}

	const locationData = await response.json();
	console.log('locationData:', locationData);
	if(locationData.length === 0)
		return 404;
	
	if(locationData[0].local_names && locationData[0].local_names.en)
		locationData[0].name = locationData[0].local_names.en;

	endpoint = 'https://api.openweathermap.org/data/2.5/onecall';
	let query = `?lat=${ locationData[0].lat }&lon=${ locationData[0].lon }`;
	url = endpoint + query + appID + '&units=metric';

	response = await fetch(url);
	if(!response.ok) {

		console.log('Something went wrong!');
		return null;
	}

	const weatherData = await response.json();
	// console.log('weatherData:', weatherData);

	return {
		name: locationData[0].name,
		weatherData: weatherData,
	};
};

const useStyles = makeStyles((theme) => ({

	title: {
		margin: '0.4em auto 0',
		padding: '0 0.8em',
		position: 'relative',
		width: 'fit-content',
		textAlign: 'center',
		fontSize: '2.25em',
        [theme.breakpoints.up('sm')]: {
			marginTop: 0,
            fontSize: '3em',
        },
		fontWeight: 300,
	},
	icon: {
		position: 'absolute',
		height: '100%',
		left: 0,
		fontSize: '0.8em',
	},
}));

const Home = ({ location, setLocationIsError, reqRefresh }) => {

	const classes = useStyles();
	
	const [currLocation, setCurrLocation] = useState(location);
	const [weatherData, setWeatherData] = useState(null);

	useEffect(() => {

		getData(location).then(data => {
			
			console.log(data);
			if(data === 404)
				setLocationIsError(true);
			else if(data !== null) {

				setLocationIsError(false);
				setCurrLocation(data.name);
				setWeatherData(data.weatherData);
			}
		});
	}, [location, setLocationIsError, reqRefresh]);

    return (

        <Container className="home">

			<Typography
				variant="h4"
				className={ classes.title }
				gutterBottom
			>
				<LocationOnOutlined className={ classes.icon } />
				{ capitalize(currLocation) }
			</Typography>
			{ weatherData && (

				<div className="condition">
					<img src={ `https://openweathermap.org/img/wn/${ weatherData.current.weather[0].icon }.png` } alt="" />
					<span>
						{ capitalize(weatherData.current.weather[0].description) }
					</span>
				</div>
			)}

            { !weatherData && 'Loading...' }

			{ weatherData && (

				<CurrentWeather
					weatherData={ weatherData.current }
					dayOneData={ weatherData.daily[0] }
				/>
			)}

			{ weatherData && (

				<ForecastOverview />
			)}

        </Container>
    );
}
 
export default Home;