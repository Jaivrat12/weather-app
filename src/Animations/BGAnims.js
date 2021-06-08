import ReactDOM from 'react-dom';

import { Day } from './Day';
import { Night } from './Night';
import { Rain } from './Rain';

const renderWeatherAnim = () => {

	ReactDOM.render(

		<></>,
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

	let skyBG;
	const hour = new Date(Date.now() + timezoneOffset * 1000).getUTCHours();
	console.log(hour);
	if(hour >= 6 && hour < 18) {

		console.log('Day');
		skyBG = 'day';
	}
	else {

		console.log('Night');
		skyBG = 'night';
	}

	const background = document.querySelector('#bg');
	const appbar = document.querySelector('header');
	if(background.style['background-image'] !== skyBGColors[skyBG]) {
		
		background.style.opacity = 0;
		setTimeout(() => {
			
			background.style.background = skyBGColors[skyBG];
			background.style.opacity = 1;
			setTimeout(() => appbar.style.background = appbarColors[skyBG], 500);
		}, 500);
	}
};

export default updateWeatherBG;