import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import ForecastCard from './ForecastCard';


const useStyles = makeStyles((theme) => ({

    heading: {
        marginLeft: '0.5em',
        textAlign: 'center',
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.2em',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.1em',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1em',
        },
    },
    btn: {
        color: 'white',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.9em',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.75em',
        },
    },
}));

const titleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const ForecastPreview = ({ path, previews, heading, dateFormat }) => {
    
    const classes = useStyles();

    let stepDelay = 0;
    const incStepDelay = () => stepDelay += 0.1;

    const controls = useAnimation();
	const { ref, inView } = useInView({ triggerOnce: true });

    useEffect(() => {
		if(inView)
			controls.start('visible');
	}, [controls, inView]);

    return (
        
        <div className="preview">
            <motion.div
                variants={ titleVariants }
                initial="hidden"
                animate={ controls }
                transition={{ duration: 0.25, delay: 0.85 }}
                ref={ ref }
            >
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h6" className={ classes.heading }>
                            { heading }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Link to={ path }>
                            <Button className={ classes.btn }>
                                More Details
                                <NavigateNextIcon />
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </motion.div>
            <Grid container justify="center">
                { previews.map((preview) => (

                    <ForecastCard
                        preview={ preview }
                        previews={ previews }
                        dateFormat={ dateFormat }
                        animDelay={ incStepDelay() }
                        key={ preview.dt }
                    />
                ))}
            </Grid>
        </div>
    );
}
 
export default ForecastPreview;