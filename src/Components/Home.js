import { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import CurrentWeather from "./CurrentWeather";
import { capitalize } from "../lib/utilities";
import ForecastPreview from "./ForecastPreview";

import { fetchData } from "../lib/fetchData";


const Home = ({ location, setData, reqRefresh, setLocationIsError }) => {

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