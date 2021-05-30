import useFetch from "../Hooks/useFetch";


const Location = ({ location, setLocationIsError }) => {
    
	console.log('Location rendered');
    console.log(location);

    const endpoint = 'https://api.openweathermap.org/data/2.5/';
	const appID = '&appid=cad8852b13cf2ae06dc0303a9c81ac0c';

	let query = '?q=' + location;
	let url = endpoint + 'weather' + query + appID + '&units=metric';

	let { data: locationData } = useFetch(url);
    console.log('locationData:', locationData);

	if(locationData) {

		if(locationData.cod === 200) {
	
			setLocationIsError(false);
			query = `?lat=${ locationData.coord.lat }&lon=${ locationData.coord.lon }`;
			url = endpoint + 'onecall' + query + appID + '&units=metric';
		}
		else {
				
			setLocationIsError(true);
			url = null;
		}
	}
	else {
		url = null;
	}
	
	const { data } = useFetch(url);
	
	console.log('data:', data);

    return (

        <>
            { !data && 'Loading...' }
			{ data && (

				<div>
					<div>
						{ data.lat + ', ' + data.lon }
					</div>
					<div>
						{ data.current.temp }
					</div>
					<div>
						{ data.current.weather[0].main }
						<br />
						{ data.current.weather[0].description }
					</div>
				</div>
			)}
        </>
    );
};
 
export default Location;