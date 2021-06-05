import Container from "@material-ui/core/Container";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { motion } from "framer-motion";

import CurrentWeather from "./CurrentWeather";
import ForecastPreview from "./ForecastPreview";
import { capitalize } from "../lib/utilities";

const Home = ({ location, weatherData }) => {

	window.scrollTo(0, 0);

	const theme = useTheme();

	const MotionContainer = motion(Container);

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

        <MotionContainer className="home"
			exit={{
				x: '-100vw',
				transition: {
					duration: 0.3,
					// ease: 'easeInOut'
				}
			}}
		>
			{ weatherData && (

				<motion.div
					className="condition"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<motion.img
						animate={{ scale: [0, 1.25, 1] }}
						transition={{ duration: 0.3, delay: 0.25 }}
						src={ `https://openweathermap.org/img/wn/${ weatherData.current.weather[0].icon }.png` }
						alt=""
					/>
					<span>
						{ capitalize(weatherData.current.weather[0].description) }
					</span>
				</motion.div>
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

        </MotionContainer>
    );
}
 
export default Home;