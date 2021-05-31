import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

    temp: {
        position: 'relative',
        marginRight: '0.25em',
		// fontSize: '7em',
        fontSize: '10em',
        fontWeight: 300,
        [theme.breakpoints.up('sm')]: {
            marginRight: '0.3em',
            fontSize: '10em',
        },
        '& sup': {
            position: 'absolute',
            right: '-0.475em',
            paddingTop: '0.4em',
            fontSize: '0.325em',
            fontWeight: 400,
        },
    },
    tempRange: {
        width: 'fit-content',
        textAlign: 'center',
        fontSize: '1.5em',
        // fontSize: '2em',
        fontWeight: 400,
        // fontWeight: 100,
        [theme.breakpoints.up('sm')]: {
            fontSize: '2em',
            // fontWeight: 300,
        },
        '& hr': {
            margin: '0.12em 0',
            backgroundColor: '#fff4',
        },
    },
}));

const WeatherOverview = ({ weatherData: data, tempRange }) => {
    
    const classes = useStyles();

    return (

        <div className="overview">

            <div className="condition">
                <img src={ `https://openweathermap.org/img/wn/${ data.weather[0].icon }.png` } alt="" />
                <span>{ data.weather[0].main }</span>
            </div>

            <div className="temps">
                <Typography
                    variant="h1"
                    className={ classes.temp }
                    gutterBottom
                >
                    { Math.round(data.temp) }<sup>°C</sup>
                </Typography>

                <Typography
                    variant="h4"
                    className={ classes.tempRange }
                    gutterBottom
                >
                    <div>{ Math.round(tempRange.max) }°C</div>
                    <Divider />
                    <div>{ Math.round(tempRange.min) }°C</div>
                </Typography>
            </div>
            
        </div>
    );
};
 
export default WeatherOverview;