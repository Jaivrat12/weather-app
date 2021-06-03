import { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import LocationOnOutlined from "@material-ui/icons/LocationOnOutlined";

import CurrentWeather from "./CurrentWeather";
import ForecastPreview from "./ForecastPreview";

import { capitalize } from "../lib/utilities";
import { fetchData } from "../lib/fetchData";


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
}));

const Home = ({ location, currLocation, setData, reqRefresh, setLocationIsError }) => {

	const classes = useStyles();
	const theme = useTheme();

	const [weatherData, setWeatherData] = useState(null);

    const useGetCurrSize = () => {
        
        let end;
        const useScreenSize = (size) => useMediaQuery(theme.breakpoints.up(size));

        if(useScreenSize('xs'))
            end = 4;
        if(useScreenSize('sm'))
            end = 5;
        if(useScreenSize('md'))
            end = 6;
        if(useScreenSize('lg'))
            end = 7;

        return end;
    };

    const previews = useGetCurrSize();

	useEffect(() => {

		fetchData(location).then(data => {
			
			console.log(data);
			if(data === 404)
				setLocationIsError(true);
			else if(data !== null) {

				setData(data);
				setWeatherData(data.weatherData);
			}
		});
	}, [location, reqRefresh, setData, setLocationIsError]);

    return (

        <Container className="home">

			<Typography
				variant="h4"
				className={ classes.title }
				gutterBottom
			>
				<LocationOnOutlined className={ classes.locIcon } />
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

				<>
				<CurrentWeather
					weatherData={ weatherData.current }
					dayOneData={ weatherData.daily[0] }
				/>

				{previews && (
					<>
					<ForecastPreview
						path={ `/hourly/${location}` }
						previews={ weatherData.hourly.slice(0, previews) }
						heading="Hourly Forecast"
						dateFormat="hour"
					/>

					<ForecastPreview
						path={ `/daily/${location}` }
						previews={ weatherData.daily.slice(0, previews) }
						heading="Daily Forecast"
						dateFormat="day"
					/>
					</>
				)}
				</>
			)}

        </Container>
    );
}
 
export default Home;