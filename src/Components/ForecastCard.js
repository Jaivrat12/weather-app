import { useEffect } from 'react';

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { capitalize, formatDate } from "../lib/utilities";


const useStyles = makeStyles((theme) => ({

    card: {
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.9em',
        },
        [theme.breakpoints.down(500)]: {
            margin: theme.spacing(0.25),
        },
        [theme.breakpoints.down(321)]: {
            width: '45%',
        },
        '& > div': {
            margin: theme.spacing(0.5),
            padding: theme.spacing(1, 0),
            borderRadius: '0.725rem',
            backgroundColor: '#fff2',
            [theme.breakpoints.down(420)]: {
                margin: '0.15em 0.15em',
            },
        },
        '& hr': {
            margin: '0.15em 0.5em',
            backgroundColor: '#fff4',
            [theme.breakpoints.down(420)]: {
                margin: '0.15em 0.15em',
            },
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
}));

const cardVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 }
}

const ForecastCard = ({ preview, previews, dateFormat, animDelay, timezone }) => {

    const classes = useStyles();

    const controls = useAnimation();
	const { ref, inView } = useInView({ triggerOnce: true });

    useEffect(() => {

		if(inView)
			controls.start('visible');
	}, [controls, inView]);

    return (

        <Grid item className={ classes.card }>
            <motion.div
                variants={ cardVariants }
                initial="hidden"
                animate={ controls }
                transition={{ duration: 0.25, delay: 0.5 + animDelay }}
                ref={ ref }
            >
                <Paper className={ classes.paper + ' ' + classes.title } elevation={ 0 }>
                    
                    { dateFormat === 'hour' && previews[0].dt === preview.dt && 'Now' }
                    { dateFormat === 'hour' && previews[0].dt !== preview.dt && formatDate(preview.dt, dateFormat, timezone) }

                    { dateFormat === 'day' && previews[0].dt === preview.dt && 'Today' }
                    { dateFormat === 'day' && previews[1].dt === preview.dt && 'Tomorrow' }
                    { 
                        dateFormat === 'day' &&
                        previews[0].dt !== preview.dt && previews[1].dt !== preview.dt &&
                        formatDate(preview.dt, dateFormat, timezone) 
                    }

                </Paper>
                <Paper className={ classes.paper } elevation={ 0 }>
                    <img src={ `https://openweathermap.org/img/wn/${ preview.weather[0].icon }.png` } alt="" />
                </Paper>
                <Paper className={ classes.paper } elevation={ 0 }>
                    { capitalize(preview.weather[0].main) }
                </Paper>
                <Paper className={ classes.paper } elevation={ 0 }>
                    { !preview.temp.day && preview.temp + ' °C' }
                    { preview.temp.day && (

                        <Grid container justify="center">
                            {Math.round(preview.temp.max) + ' °C'}
                            <Divider orientation="vertical" flexItem />
                            {Math.round(preview.temp.min) + ' °C'}
                        </Grid>
                    )}
                </Paper>
            </motion.div>
        </Grid>
    );
};
 
export default ForecastCard;