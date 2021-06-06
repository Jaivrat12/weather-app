import ReactDOM from 'react-dom';
import Loader from '../Components/Loader';


const renderLoader = (status = 'loading') => {

	ReactDOM.render(

		<Loader status={ status } />,
		document.getElementById('loader')
	);
};

// Use Combo box for suggestions
// And add a Cleanup function
export const fetchData = async (location) => {

	renderLoader();

	let endpoint = 'https://api.openweathermap.org/geo/1.0/direct?q=';
	const appID = '&appid=cad8852b13cf2ae06dc0303a9c81ac0c';

	let url = endpoint + location + appID + '&limit=5';

	let response = await fetch(url);
	if(!response.ok) {

		console.log('Something went wrong!');
		renderLoader('error');
		return null;
	}

	const locationData = await response.json();
	console.log('locationData:', locationData);
	if(locationData.length === 0) {

		renderLoader('invalid');
		return 404;
	}
	
	if(locationData[0].local_names && locationData[0].local_names.en)
		locationData[0].name = locationData[0].local_names.en;

	endpoint = 'https://api.openweathermap.org/data/2.5/onecall';
	let query = `?lat=${ locationData[0].lat }&lon=${ locationData[0].lon }`;
	url = endpoint + query + appID + '&units=metric';

	response = await fetch(url);
	if(!response.ok) {

		console.log('Something went wrong!');
		renderLoader('error');
		return null;
	}

	const weatherData = await response.json();
	// console.log('weatherData:', weatherData);

	renderLoader('loaded');

	return {

		name: locationData[0].name,
		weatherData: weatherData,
	};
};