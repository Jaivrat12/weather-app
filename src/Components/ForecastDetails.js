import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from '@material-ui/core/styles';

import LocationOnOutlined from "@material-ui/icons/LocationOnOutlined";

import { motion } from "framer-motion";

import { fetchData } from "../lib/fetchData";
import { capitalize, formatDate } from "../lib/utilities";


const useStyles = makeStyles((theme) => ({

	locHeading: {
		margin: '0.4em auto 0',
		padding: '0 0.8em',
		position: 'relative',
		width: 'fit-content',
		fontSize: '2.25em',
        [theme.breakpoints.up('sm')]: {
			marginTop: 0,
            fontSize: '3em',
        },
		fontWeight: 300,
	},
	locIcon: {
		position: 'absolute',
		height: '100%',
		left: 0,
		fontSize: '0.8em',
	},
    heading: {
        margin: theme.spacing(2.5, 0),
        textAlign: 'center',
    },
    container: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    card: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(1, 0),
        flexGrow: 1,
        backgroundColor: '#fff2',
        borderRadius: '0.725rem',
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.9em',
        },
        [theme.breakpoints.down(321)]: {
            width: '100%',
        },
        '& hr': {
            backgroundColor: '#fff2',
        },
    },
    paper: {
        backgroundColor: 'transparent',
        color: 'white',
        textAlign: 'center',
        [theme.breakpoints.down(420)]: {
            fontSize: '0.85em',
        },
    },
    title: {
        fontSize: '0.85em',
        color: '#fffb',
        fontWeight: 700,
    },
    details: {
        height: '100%',
    },
}));

const ForecastDetails = ({ weatherData, cols, dateFormat, timezone }) => {
    
    const classes = useStyles();

    const MotionGrid = motion(Grid);
    
    // let stepDelay = 0;
    // const incStepDelay = () => stepDelay += 0.01;

	const loc = useLocation();
    const history = useHistory();

    const [forecastDetails, setForecastDetails] = useState(null);

    const dataType = loc.pathname.split('/')[1];
    const location = loc.pathname.split('/')[2];

    const getDetails = (data) => {

        return [

            {
                name: 'Sunrise',
                value: formatDate(data.sunrise, 'hour', timezone),
            },
            {
                name: 'Sunset',
                value: formatDate(data.sunset, 'hour', timezone),
            },
            {
                name: 'Max',
                value: Math.round(data.temp.max) + ' °C',
            },
            {
                name: 'Min',
                value: Math.round(data.temp.min) + ' °C',
            },
        ];
    };

	useEffect(() => {

		if(weatherData)
            setForecastDetails(weatherData);
        else {

            fetchData(location).then(data => {
			
                console.log(data);
                if(data === 404)
                    history.push('/');
                else if(data !== null)
                    setForecastDetails(data.weatherData[dataType]);
            });
        }
	}, [location, dataType, history, weatherData]);

    return (

        <>
        <Typography variant="h4" className={ classes.locHeading } gutterBottom>
            <LocationOnOutlined className={ classes.locIcon } />
            { capitalize(location) }
        </Typography>
        <motion.div
            initial={{
				x: '100vw'
			}}
            animate={{
				x: 0,
				transition: {
                    type: 'spring',
					duration: 1,
				}
			}}
            exit={{
				x: '100vw',
				transition: {
					duration: 0.25,
				}
			}}
        >
            <Typography variant="h4" className={ classes.heading }>
                { capitalize(dataType) } Forecast
            </Typography>
            { forecastDetails && (

                <Grid container justify="center" className={ classes.container }>
                { forecastDetails.map(preview => (

                    <MotionGrid
                        item
                        xs={ cols.xs } sm={ cols.sm } md={ cols.md } lg={ cols.lg }
                        className={ classes.card }
                        // initial={{ scale: 0 }}
                        // animate={{ scale: 1 }}
                        // transition={{ duration: 0.25, delay: 0.3 + incStepDelay() }}
                        // exit={{
                        //     scale: 1,
                        //     transition: {
                        //         duration: 0.5,
                        //         ease: 'easeInOut'
                        //     }
                        // }}
                        key={ preview.dt }
                    >
                        <Grid container justify="space-evenly">
                            <Grid item xs={ dataType === 'daily' ? 3 : 12 }>
                                <Paper className={ classes.paper + ' ' + classes.title } elevation={ 0 }>
                                    { formatDate(preview.dt, dateFormat, timezone) }
                                </Paper>
                                <Paper className={ classes.paper } elevation={ 0 }>
                                    <img src={ `https://openweathermap.org/img/wn/${ preview.weather[0].icon }.png` } alt="" />
                                </Paper>
                                <Paper className={ classes.paper } elevation={ 0 }>
                                    { capitalize(preview.weather[0].description) }
                                </Paper>
                                <Paper className={ classes.paper } elevation={ 0 }>
                                    { !preview.temp.day && preview.temp + ' °C' }
                                </Paper>
                            </Grid>
                            { dataType === 'daily' && (

                                <>
                                <Divider orientation="vertical" flexItem />
                                <Grid item>
                                    <Grid container className={ classes.details } justify="space-evenly" align="center">
                                    { getDetails(preview).map(detail => (

                                        <Grid item xs={ 6 } key={ detail.name }>
                                            <Paper className={ classes.paper + ' ' + classes.title } elevation={ 0 }>
                                                { detail.name }
                                            </Paper>
                                            <Paper className={ classes.paper } elevation={ 0 }>
                                                { detail.value }
                                            </Paper>
                                        </Grid>
                                    ))}
                                    </Grid>
                                </Grid>
                                </>
                            )}
                        </Grid>
                    </MotionGrid>
                ))}
                </Grid>
            ) }
        </motion.div>
        </>
    );
};
 
export default ForecastDetails;