import Container from "@material-ui/core/Container";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import CurrentWeather from "./CurrentWeather";
import { capitalize } from "../lib/utilities";
import ForecastPreview from "./ForecastPreview";


const Home = ({ location, weatherData }) => {

	const theme = useTheme();

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

				{ previews && (

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