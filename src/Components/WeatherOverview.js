import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

    temp: {
        marginRight: '0.5em',
		fontSize: '7em',
        [theme.breakpoints.up('sm')]: {
            fontSize: '10em',
        },
        fontWeight: 100,
    },
    tempRange: {
        width: 'fit-content',
        fontSize: '1.4em',
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            fontSize: '2em',
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
                <img src={ `http://openweathermap.org/img/wn/${ data.weather[0].icon }.png` } alt="" />
                <span>{ data.weather[0].main }</span>
            </div>

            <div className="temps">
                <Typography
                    variant="h1"
                    className={ classes.temp }
                    gutterBottom
                >
                    { Math.round(data.temp) } <sup>°C</sup>
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