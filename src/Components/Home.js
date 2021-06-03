import Container from "@material-ui/core/Container";

import CurrentWeather from "./CurrentWeather";
import { capitalize } from "../lib/utilities";
import ForecastPreview from "./ForecastPreview";


const Home = ({ location, weatherData }) => {

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

				<ForecastPreview
					path={ `/hourly/${location}` }
					data={ weatherData.hourly }
					heading="Hourly Forecast"
					dateFormat="hour"
				/>

				<ForecastPreview
					path={ `/daily/${location}` }
					data={ weatherData.daily }
					heading="Daily Forecast"
					dateFormat="day"
				/>
				</>
			)}

        </Container>
    );
}
 
export default Home;