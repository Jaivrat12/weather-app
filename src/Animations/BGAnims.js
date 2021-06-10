import ReactDOM from 'react-dom';

import DayAnim from './DayAnim';
import NightAnim from './NightAnim';
// import RainAnim from './RainAnim';

const renderWeatherAnim = (BGAnim) => {

	ReactDOM.render(

		<BGAnim />,
		document.getElementById('bg')
	);
};

const updateWeatherBG = (weather, timezoneOffset) => {

	const appbarColors = {

		'day': 'rgb(0, 85, 255)',
		'night': 'rgb(0, 7, 104)',
		'cloudy': 'rgb(39, 39, 39)',
	};

	const skyBGColors = {

		'day': 'linear-gradient(rgb(0, 85, 255), rgb(0, 153, 255))',
		'night': 'linear-gradient(rgb(0, 7, 104), rgb(70, 0, 117), rgb(85, 0, 141), rgb(95, 0, 158))',
		'cloudy': 'linear-gradient(rgb(39, 39, 39), rgb(58, 58, 58), rgb(77, 77, 77))',
	};

	const hour = new Date(Date.now() + timezoneOffset * 1000).getUTCHours();
	let skyBG, BGAnim;
	if(hour >= 6 && hour < 18) {

		skyBG = 'day';
		BGAnim = DayAnim;
	}
	else {

		skyBG = 'night';
		BGAnim = NightAnim;
	}

	const background = document.querySelector('#bg');
	if(background.style.backgroundImage !== skyBGColors[skyBG]) {
		
		background.style.opacity = 0;
		setTimeout(() => {
			
			background.style.background = skyBGColors[skyBG];
			background.style.opacity = 1;
		}, 500);
	}

	renderWeatherAnim(BGAnim);

	return appbarColors[skyBG];
};

export default updateWeatherBG;