import { Link } from 'react-router-dom';

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { capitalize, formatDate } from "../lib/utilities";


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
    card: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(1, 0),
        flexGrow: 1,
        backgroundColor: '#fff2',
        borderRadius: '0.725rem',
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.9em',
        },
        [theme.breakpoints.down(500)]: {
            margin: theme.spacing(0.25),
        },
        [theme.breakpoints.down(321)]: {
            width: '45%',
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

const ForecastPreview = ({ path, previews, heading, dateFormat }) => {
    
    const classes = useStyles();

    return (
        
        <div className="preview">
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
            <Grid container justify="center">
            {previews.map(preview => (

                <Grid item className={ classes.card } key={ preview.dt }>
                    <Paper className={ classes.paper + ' ' + classes.title } elevation={ 0 }>
                        
                        { dateFormat === 'hour' && previews[0].dt === preview.dt && 'Now' }
                        { dateFormat === 'hour' && previews[0].dt !== preview.dt && formatDate(preview.dt, dateFormat) }

                        { dateFormat === 'day' && previews[0].dt === preview.dt && 'Today' }
                        { dateFormat === 'day' && previews[1].dt === preview.dt && 'Tomorrow' }
                        { 
                            dateFormat === 'day' &&
                            previews[0].dt !== preview.dt && previews[1].dt !== preview.dt &&
                            formatDate(preview.dt, dateFormat) 
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
                </Grid>
            ))}
            </Grid>
        </div>
    );
}
 
export default ForecastPreview;