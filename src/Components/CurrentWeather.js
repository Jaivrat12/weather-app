import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import AcUnitIcon from '@material-ui/icons/AcUnit';

import CurrentDetails from './CurrentDetails';
import { formatDate } from '../lib/utilities';


const useStyles = makeStyles((theme) => ({

    temp: {
        textAlign: 'center',
        position: 'relative',
        fontSize: '8.5em',
        fontWeight: 400,
        [theme.breakpoints.up(375)]: {
            fontSize: '9.5em',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '10em',
            fontWeight: 300,
        },
        '& sup': {
            position: 'absolute',
            paddingTop: '0.625em',
            fontSize: '0.275em',
            fontWeight: 500,
        },
    },
    tempRange: {
        width: 'fit-content',
        margin: 'auto',
        position: 'relative',
        top: '-1.25em',
        '& h5': {
            fontSize: '1.25em',
            fontWeight: 400,
            [theme.breakpoints.up('sm')]: {
                fontSize: '1.75em',
            },
        },
        '& hr': {
            margin: '0.25em 0.75em',
            backgroundColor: '#fff4',
        },
    },
}));

/* 
Moon phase: 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon'
and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent',
'waxing gibous', 'waning gibous', and 'waning crescent', respectively.
*/

const CurrentWeather = ({ weatherData: data, dayOneData }) => {
    
    const classes = useStyles();

    const weatherDetails = [

        {
            name: "Real Feel",
            value: data['feels_like'] + ' °C',
            icon: <AcUnitIcon />,
        },
        {
            name: "Pressure",
            value: data['pressure'] + ' hPa',
            icon: <AcUnitIcon />,
        },
        {
            name: "Humidity",
            value: data['humidity'] + '%',
            icon: <AcUnitIcon />,
        },
        {
            name: "Dew Point",
            value: data['dew_point'] + ' °C',
            icon: <AcUnitIcon />,
        },
        {
            name: "UV Index",
            value: data['uvi'],
            icon: <AcUnitIcon />,
        },
        // {
        //     name: "Cloudiness",
        //     value: data['clouds'] + '%',
        //     icon: <AcUnitIcon />,
        // },
        // {
        //     name: "Visibility",
        //     value: data['visibility'],
        //     icon: <AcUnitIcon />,
        // },
        {
            name: "Wind Speed",
            value: data['wind_speed'] + ' m/s',
            icon: <AcUnitIcon />,
        },
        // "wind_deg": 'wind_deg',
    ];

    const astroDetails = [

        {
            name: "Sunrise",
            value: formatDate(dayOneData['sunrise']),
            icon: <AcUnitIcon />,
        },
        {
            name: "Sunset",
            value: formatDate(dayOneData['sunset']),
            icon: <AcUnitIcon />,
        },
        {
            name: "Moonrise",
            value: formatDate(dayOneData['moonrise']),
            icon: <AcUnitIcon />,
        },
        {
            name: "Moonset",
            value: formatDate(dayOneData['moonset']),
            icon: <AcUnitIcon />,
        },
        {
            name: "Moon Phase",
            value: dayOneData['moon_phase'],
            icon: <AcUnitIcon />,
        },
    ];

    return (

        <>
        <Grid container justify="center">
            <Grid item xs={ 12 } sm={ 8 } md={ 5 }>

                <Typography variant="h1" className={ classes.temp }>   
                    { Math.round(data.temp) }<sup>°C</sup>
                </Typography>

                <Grid container className={ classes.tempRange }>
                    <Typography variant="h5">
                        { Math.round(dayOneData.temp.max) } °C
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography variant="h5">
                        { Math.round(dayOneData.temp.min) } °C
                    </Typography>
                </Grid>

            </Grid>
        </Grid>

        <Grid container justify="space-evenly">

            <Grid item xs={ 12 } sm={ 9 } md={ 5 } className="details">
                <CurrentDetails label="Astro Details" details={ astroDetails }/>
            </Grid>

            <Grid item xs={ 12 } sm={ 9 } md={ 5 } className="details">
                <CurrentDetails label="Weather Details" details={ weatherDetails }/>
            </Grid>

        </Grid>
        </>
    );
};
 
export default CurrentWeather;