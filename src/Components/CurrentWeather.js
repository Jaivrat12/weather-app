import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import CurrentDetails from './CurrentDetails';
import {
    Sunrise, Sunset, Moonrise, Moonset,
    NewMoon, WaxingCrescent, FirstQuarter, WaxingGibbous,
    FullMoon, WaningGibbous, ThirdQuarter, WaningCrescent,
    RealFeel, Pressure, Humidity, DewPoint, UVIndex, Wind,
} from '../Assets/Icons.js';

import { formatDate } from '../lib/utilities';
import { motion } from 'framer-motion';


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

const getMoonPhase = (phase, dataType) => {

    let phaseName = 'New Moon';
    let icon = <NewMoon />;

    if(phase > 0 && phase < 0.25) {

        phaseName = 'Waxing Crescent';
        icon = <WaxingCrescent />;
    }
    else if(phase === 0.25) {

        phaseName = 'First Quarter';
        icon = <FirstQuarter />;
    }
    else if(phase > 0.25 && phase < 0.5) {

        phaseName = 'Waxing Gibbous';
        icon = <WaxingGibbous />;
    }
    else if(phase === 0.5) {

        phaseName = 'Full Moon';
        icon = <FullMoon />;
    }
    else if(phase > 0.5 && phase < 0.75) {

        phaseName = 'Waning Gibbous';
        icon = <WaningGibbous />;
    }
    else if(phase === 0.75) {

        phaseName = 'Third Quarter';
        icon = <ThirdQuarter />;
    }
    else if(phase > 0.75 && phase < 1) {

        phaseName = 'Waning Crescent';
        icon = <WaningCrescent />;
    }

    if(dataType === 'name')
        return phaseName;
    else if(dataType === 'icon')
        return icon;
};

const CurrentWeather = ({ weatherData: data, dayOneData }) => {
    
    const classes = useStyles();

    const MotionDivider = motion(Divider);

    const weatherDetails = [

        {
            name: "Real Feel",
            value: data['feels_like'] + ' °C',
            icon: <RealFeel />,
        },
        {
            name: "Pressure",
            value: data['pressure'] + ' hPa',
            icon: <Pressure />,
        },
        {
            name: "Humidity",
            value: data['humidity'] + '%',
            icon: <Humidity />,
        },
        {
            name: "Dew Point",
            value: data['dew_point'] + ' °C',
            icon: <DewPoint />,
        },
        {
            name: "UV Index",
            value: data['uvi'],
            icon: <UVIndex />,
        },
        {
            name: "Wind Speed",
            value: data['wind_speed'] + ' m/s',
            icon: <Wind />,
        },
    ];

    const astroDetails = [

        {
            name: "Sunrise",
            value: formatDate(dayOneData['sunrise']),
            icon: <Sunrise />,
        },
        {
            name: "Sunset",
            value: formatDate(dayOneData['sunset']),
            icon: <Sunset />,
        },
        {
            name: "Moonrise",
            value: formatDate(dayOneData['moonrise']),
            icon: <Moonrise />,
        },
        {
            name: "Moonset",
            value: formatDate(dayOneData['moonset']),
            icon: <Moonset />,
        },
        {
            name: "Moon Phase",
            value: getMoonPhase(dayOneData['moon_phase'], 'name'),
            icon: getMoonPhase(dayOneData['moon_phase'], 'icon'),
        },
    ];

    return (

        <>
        <Grid container justify="center">
            <Grid item xs={ 12 } sm={ 8 } md={ 5 }>

                <Typography variant="h1" className={ classes.temp }>   
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        { Math.round(data.temp) }<sup>°C</sup>
                    </motion.div>
                </Typography>

                <Grid container className={ classes.tempRange }>
                    <Typography variant="h5">
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                        >
                            { Math.round(dayOneData.temp.max) } °C
                        </motion.div>
                    </Typography>
                    <MotionDivider orientation="vertical" flexItem 
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                    />
                    <Typography variant="h5">
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                        >
                            { Math.round(dayOneData.temp.min) } °C
                        </motion.div>
                    </Typography>
                </Grid>

            </Grid>
        </Grid>

        <Grid container justify="space-evenly">

            <Grid item xs={ 12 } sm={ 9 } md={ 5 }>
                <motion.div
                    className="details"
                    initial={{
                        y: -50,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1
                    }}
                    transition={{ duration: 0.25, delay: 0.6 }}
                >
                    <CurrentDetails label="Astro Details" details={ astroDetails }/>
                </motion.div>
            </Grid>

            <Grid item xs={ 12 } sm={ 9 } md={ 5 }>
                <motion.div
                    className="details"
                    initial={{ 
                        y: 50, 
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1
                    }}
                    transition={{ duration: 0.25, delay: 0.6 }}
                >
                    <CurrentDetails label="Weather Details" details={ weatherDetails }/>
                </motion.div>
            </Grid>

        </Grid>
        </>
    );
};
 
export default CurrentWeather;