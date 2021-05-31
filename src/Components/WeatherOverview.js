import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

    temp: {
        fontFamily: 'Quicksand',
        position: 'relative',
        marginRight: '0.05em',
		// fontSize: '7em',
        fontSize: '8.5em',
        fontWeight: 400,
        [theme.breakpoints.up(375)]: {
            fontSize: '9.5em',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '10em',
            fontWeight: 300,
        },
        '& span': {
            position: 'absolute',
            // right: '-0.475em',
            [theme.breakpoints.down('sm')]: {
                right: '-0.85em',
            },
            paddingTop: '0.625em',
            fontSize: '0.275em',
            fontWeight: 500,
        },
    },
    tempRange: {
        fontFamily: 'Quicksand',
        width: 'fit-content',
        textAlign: 'center',
        fontSize: '1.85em',
        // fontSize: '2em',
        fontWeight: 500,
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
                    { Math.round(data.temp) }<span>°C</span>
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