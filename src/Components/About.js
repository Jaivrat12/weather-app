import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from "@material-ui/core/styles";

import { motion } from "framer-motion";


const useStyles = makeStyles((theme) => ({

    heading: {
        textAlign: 'center',
    },
    body: {
        margin: '0 auto 3rem',
        // padding: theme.spacing(1, 8),
        textAlign: 'center',
        fontWeight: 400,
        fontSize: '1.5rem',
        lineHeight: '1.3',
        [theme.breakpoints.down('md')]: {
            // padding: theme.spacing(1, 6),
            fontSize: '1.4rem',
        },
        [theme.breakpoints.down('sm')]: {
            // padding: theme.spacing(1, 3),
            fontSize: '1.2rem',
        },
        [theme.breakpoints.down('xs')]: {
            // padding: theme.spacing(0, 1.25),
            fontSize: '0.95rem',
        },
    },
    features: {
        marginBottom: '2rem',
        lineHeight: 1.15,
        fontSize: '1.25rem',
        '& h5': {
            textAlign: 'center',
            fontWeight: 500,
        },
        '& hr': {
            backgroundColor: '#fff4',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.1rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1rem',
            '& li': {
                paddingLeft: '2rem !important',
            },
        },
    },
    footer: {
        marginBottom: '1rem',
        lineHeight: 1.15,
        fontSize: '1.2rem',
        textAlign: 'center',
        '& h5': {
            marginTop: '1rem',
            textAlign: 'center',
            fontWeight: 500,
            color: '#fffa',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '1.1rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
    },
}));

const About = () => {

    const classes = useStyles();
	const MotionContainer = motion(Container);

    return (

        <MotionContainer className="about"
            initial={{ x: '100vw' }}
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

            <Typography variant="h2" className={ classes.heading } gutterBottom>
                About
            </Typography>
            <Typography variant="body2" className={ classes.body }>
                Hey there! Thank You for checking out this Web App cuz this was my first one and I'm glad I could 
                complete it well enough if not perfectly, hope you'd like this. After going through some tutorials 
                & docs of <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React.js</a> &
                other libraries that are used here, for like 1-2 weeks, I started working on this Project. It took 
                me 20 days in total to complete this project, first 2-3 days were spent on researching about Weather 
                Data API, layout-design, features I'd add and other things along those lines, although I couldn't add 
                every small thing that I wanted to & had to let them go as the ones which are present here weren't easy 
                at all, given the time I had. It was full of challenges but was really a fun one to make! 
                Thank you again if you're still reading this lol.
            </Typography>

            <Typography variant="h4" className={ classes.heading } gutterBottom>
                App Features
            </Typography>
            <Grid className={ classes.features } container justify="center">
                <Grid item md={ 9 } sm={ 11 } xs={ 12 } className="feature-box">
                    <Typography variant="h5" gutterBottom>
                        Functionalities
                    </Typography>
                    <Divider />
                    <ul>
                        <li>Search for locations & get weather data</li>
                        <li>Refresh button to quickly refetch data without having to reload page</li>
                        <li>Hourly and Daily Forecasts</li>
                        <li>Timezone of Time details according to the location searched</li>
                    </ul>
                </Grid>
                <Grid item md={ 9 } sm={ 11 } xs={ 12 } className="feature-box">
                    <Typography variant="h5" gutterBottom>
                        Animations
                    </Typography>
                    <Divider />
                    <ul>
                        <li>Animations for most the things</li>
                        <li>Background shown according to location's weather</li>
                        <li>Day, Night, Cloudy & Rainy BGs</li>
                        <li>Clouds, Stars & Shooting Stars, Dark Clouds, & Rainy Animations</li>
                        <li>Day & Night depend on sunrise and sunset of the location</li>
                        <li>A Loading animation while fetching data</li>
                    </ul>
                </Grid>
                <Grid item md={ 9 } sm={ 11 } xs={ 12 } className="feature-box">
                    <Typography variant="h5" gutterBottom>
                        Icons
                    </Typography>
                    <Divider />
                    <ul>
                        <li>Icons for most of the things</li>
                        <li>Weather icons</li>
                        <li>Icons for different phases of the Moon</li>
                    </ul>
                </Grid>
                <Grid item md={ 9 } sm={ 11 } xs={ 12 } className="feature-box">
                    <Typography variant="h5" gutterBottom>
                        Others
                    </Typography>
                    <Divider />
                    <ul>
                        <li>Tried to make it look good on & Responsive for all screen sizes</li>
                        <li>Provided a way to View all Backgrounds & BG Animations</li>
                        <li>Appbar has Transparent & Solid states depending on page scroll</li>
                    </ul>
                </Grid>
            </Grid>

            <Grid className={ classes.footer } container justify="center">
                <Grid item sm={ 4 } xs={ 12 }>
                    <Typography variant="h5" gutterBottom>
                        Libraries & APIs
                    </Typography>
                    <ul>
                        <li>
                            <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                                React.js (v17.0.2)
                            </a>
                        </li>
                        <li>
                            <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">
                                Open Weather (Weather Data)
                            </a>
                        </li>
                        <li>
                            <a href="https://material-ui.com" target="_blank" rel="noopener noreferrer">
                                Material UI (Layouts)
                            </a>
                        </li>
                        <li>
                            <a href="https://www.framer.com/api" target="_blank" rel="noopener noreferrer">
                                Framer Motion (Animation)
                            </a>
                        </li>
                        <li>
                            <a href="https://momentjs.com/timezone" target="_blank" rel="noopener noreferrer">
                                Moment Timezone
                            </a>
                        </li>
                        <li>
                            <a href="https://www.npmjs.com/package/react-intersection-observer" target="_blank" rel="noopener noreferrer">
                                React Intersection Observer
                            </a>
                        </li>
                    </ul>
                </Grid>

                <Grid item sm={ 4 } xs={ 12 } id="libs">
                    <Typography variant="h5" gutterBottom>
                        More Of My Devs
                    </Typography>
                    <ul>
                        <li>
                            <a href="https://jaivrat12.github.io/misc-features-webpage" target="_blank" rel="noopener noreferrer">
                                Miscellaneous Features
                            </a>
                        </li>
                        <li>
                            <a href="https://jaivrat12.github.io/digital-clock" target="_blank" rel="noopener noreferrer">
                                Digital Clock
                            </a>
                        </li>
                        <li>
                            <a href="https://jaivrat12.github.io/jQuery-webpage" target="_blank" rel="noopener noreferrer">
                                Webpage made using jQuery
                            </a>
                        </li>
                        <li>
                            <a href="https://jaivrat12.github.io/contact-manager-reactjs" target="_blank" rel="noopener noreferrer">
                                Contact Manager
                            </a>
                        </li>
                    </ul>
                </Grid>

                <Grid item sm={ 4 } xs={ 12 }>
                    <Typography variant="h5" gutterBottom>
                        Other Links
                    </Typography>
                    <ul>
                        <li>
                            <a href="https://github.com/Jaivrat12/weather-app" target="_blank" rel="noopener noreferrer">
                                Source Code
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/Jaivrat12" target="_blank" rel="noopener noreferrer">
                                Github Profile
                            </a>
                        </li>
                        <li>
                            <a href="https://www.codechef.com/users/jaivrat1" target="_blank" rel="noopener noreferrer">
                                CodeChef Profile
                            </a>
                        </li>
                    </ul>
                </Grid>
            </Grid>

        </MotionContainer>
    );
};

export default About;