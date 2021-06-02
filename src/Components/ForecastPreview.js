import { Link } from 'react-router-dom';

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { capitalize, toDateStr } from "../Utilities/utilities";


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
        backgroundColor: '#fff3',
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

const ForecastPreview = ({ path, data, heading, dateFormat }) => {
    
    const classes = useStyles();

    const theme = useTheme();

    const useGetCurrSize = () => {
        
        let end;
        const useScreenSize = (size) => useMediaQuery(theme.breakpoints.up(size));

        if(useScreenSize('xs'))
            end = 4;
        if(useScreenSize('sm'))
            end = 5;
        if(useScreenSize('md'))
            end = 6;
        if(useScreenSize('lg'))
            end = 7;
        if(useMediaQuery(('(max-width:420px)')))
            end = 4;
        // if(useMediaQuery(('(max-width:320px)')))
        //     end = 6;

        return end;
    };

    const previews = data.slice(0, useGetCurrSize());

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
                        
                        { dateFormat === 'hour' && data[0].dt === preview.dt && 'Now' }
                        { dateFormat === 'hour' && data[0].dt !== preview.dt && toDateStr(preview.dt, dateFormat) }

                        { dateFormat === 'day' && data[0].dt === preview.dt && 'Today' }
                        { dateFormat === 'day' && data[1].dt === preview.dt && 'Tomorrow' }
                        { 
                            dateFormat === 'day' &&
                            data[0].dt !== preview.dt && data[1].dt !== preview.dt &&
                            toDateStr(preview.dt, dateFormat) 
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
                        { 
                            preview.temp.day && 
                            Math.round(preview.temp.max) + ' °C | '
                            +
                            Math.round(preview.temp.min) + ' °C' 
                        }
                    </Paper>
                </Grid>
            ))}
            </Grid>
        </div>
    );
}
 
export default ForecastPreview;