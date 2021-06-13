import ReactDOM from 'react-dom';

import DayAnim from './DayAnim';
import NightAnim from './NightAnim';
import RainAnim from './RainAnim';

import { strInArr } from '../lib/utilities';


const appbarColors = {

	'day': 'rgb(0, 85, 255)',
	'night': 'rgb(0, 7, 104)',
	'cloudy': 'rgb(28, 37, 54)',
};

const skyBGColors = {

	'none': 'none',
	'day': 'linear-gradient(rgb(0, 85, 255), rgb(0, 153, 255))',
	'night': 'linear-gradient(rgb(0, 7, 104), rgb(70, 0, 117), rgb(85, 0, 141), rgb(95, 0, 158))',
	'cloudy': 'linear-gradient(rgb(28, 37, 54), rgb(57, 69, 90), rgb(83, 92, 110))',
};

const updateBG = (skyBG, BGAnim, isRaining, target = '#bg') => {

	const background = document.querySelector(target);

	if(background.style.backgroundImage !== skyBGColors[skyBG]) {
		
		background.style.opacity = 0;
		setTimeout(() => {
			
			background.style.background = skyBGColors[skyBG];
			background.style.opacity = 1;
		}, 500);
	}

	if(BGAnim) {

		ReactDOM.render(

			<BGAnim isRaining={ isRaining } />,
			background
		);
	}
	else {

		ReactDOM.render(

			<div></div>,
			background
		);
	}
};

const updateWeatherBG = (weather, sunrise, sunset) => {

	const clearConditions = [
		'clouds', 'clear', 'clear sky',
		'few clouds', 'scattered clouds'
	];
	const cloudyConditions = [
		'broken clouds', 'overcast clouds', 'thunderstorm',
		'heavy snow', 'shower snow', 'heavy shower snow'
	];
	const rainyConditions = [
		'rain', 'shower rain',
		'thunderstorm with light rain', 'thunderstorm with rain', 'thunderstorm with heavy rain',
		'thunderstorm with light drizzle', 'thunderstorm with drizzle', 'thunderstorm with heavy drizzle',
		'drizzle', 'sleet', 'shower sleet', 'light rain and snow', 'rain and snow'
	];
	const exceptionalConditions = [
		'mist', 'smoke', 'haze', 'dust', 'fog',
		'sand', 'ash', 'squall', 'tornado'
	];

	let skyBG, BGAnim, isRaining = false;
	if(
		!strInArr(exceptionalConditions, weather.main) &&
		(!strInArr(clearConditions, weather.main) || !strInArr(clearConditions, weather.description))
	) {

		const isCloudy = strInArr(cloudyConditions, weather.main) || strInArr(cloudyConditions, weather.description);
		isRaining = strInArr(rainyConditions, weather.main) || strInArr(rainyConditions, weather.description)

		if(isCloudy || isRaining) {

			skyBG = 'cloudy';
			BGAnim = RainAnim;
		}
	}
	else {

		const hour = Date.now();
		sunrise *= 1000; sunset *= 1000;
		if(hour >= sunrise && hour <= sunset) {

			skyBG = 'day';
			BGAnim = DayAnim;
		}
		else {
	
			skyBG = 'night';
			BGAnim = NightAnim;
		}
	}

	updateBG(skyBG, BGAnim, isRaining);

	return appbarColors[skyBG];
};

export default updateWeatherBG;

export { updateBG };