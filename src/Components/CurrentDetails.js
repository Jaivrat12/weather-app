import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({

    breakpoints: {
        values: {
            xs: 0,
            sm: 480,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

const useStyles = makeStyles({

    label: {
        fontWeight: 400,
        borderBottom: '1px solid #fff3',
        padding: theme.spacing(1, 0),
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.2em',
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0.8, 0),
            fontSize: '1.1em',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1em',
        },
    },
    paper: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: '1.1em',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1em',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.95em',
        },
    },
    title: {
        fontSize: '0.825em',
        color: '#fffb',
        fontWeight: 700,
    },
    details: {
        padding: theme.spacing(1.5, 0),
        flexGrow: 1,
        maxWidth: '100%',
    },
});

// Time according to search-place
const CurrentDetails = ({ label, details }) => {

    const classes = useStyles();

    return (

        <ThemeProvider theme={ theme }>
            <Typography className={ classes.label } variant="h6" gutterBottom>
                { label }
            </Typography>
            <Grid container justify="center">
            {details.map(detail => (

                <Grid
                    item
                    xs={ 4 }
                    className={ classes.details }
                    key={ detail.name }
                >
                    <Grid
                        container
                        justify="center" alignItems="center"
                        spacing={ 1 }
                    >
                        <Grid item xs={ 12 } sm={ 3 } md={ 12 } lg={ 3 }>
                            <Paper className={ classes.paper } elevation={ 0 }>
                                { detail.icon }
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper className={ classes.paper + ' ' + classes.title } elevation={ 0 }>
                                { detail.name }
                            </Paper>
                            <Paper className={ classes.paper } elevation={ 0 }>
                                { detail.value }
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            ))}
            </Grid>
        </ThemeProvider>
    );
};

export default CurrentDetails;