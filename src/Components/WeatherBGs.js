import { useState } from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { motion } from 'framer-motion';

import DayAnim from '../Animations/DayAnim';
import NightAnim from '../Animations/NightAnim';
import RainAnim from '../Animations/RainAnim';

import { updateBG } from '../Animations/BGAnims';
import { useEffect } from "react";


const useStyles = makeStyles((theme) => ({

    heading: {
        marginTop: theme.spacing(-12),
        textAlign: 'center',
    },
    container: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridContainer: {
        marginTop: theme.spacing(6),
        maxWidth: 'fit-content',
    },
    gridItem: {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        height: '12.5rem',
        width: '12.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fff2',
        color: '#fff8',
        border: '3px solid #fff3',
        borderRadius: '2rem',
        fontSize: '1.5rem',
        cursor: 'pointer',
        [theme.breakpoints.down(460)]: {
            height: '45vw',
            width: '45vw',
        },
    },
    active: {
        background: ({ cardBG }) => cardBG,
        borderRadius: '2rem',
        borderColor: '#c8e9ff',
        color: 'white',
    },
}));

const setFakeBG = (val) => document.querySelector('#fake-bg').style.opacity = val;

const cards = [

    {
        title: 'Day',
        cardBG: 'linear-gradient(135deg, #2718ff, #3f5fff, #4d6bff)',
        skyBG: 'day',
        BGAnim: DayAnim,
    },
    {
        title: 'Night',
        cardBG: 'linear-gradient(135deg, #5900ff, #b700ff)',
        skyBG: 'night',
        BGAnim: NightAnim,
    },
    {
        title: 'Cloudy',
        cardBG: 'linear-gradient(135deg, #1c2536, #39455a, #535c6e)',
        skyBG: 'cloudy',
        BGAnim: RainAnim,
    },
    {
        title: 'Rainy',
        cardBG: 'linear-gradient(135deg, #172849, #3a4b68, #64728d)',
        skyBG: 'cloudy',
        BGAnim: RainAnim,
        isRaining: true,
    },
];

const WeatherBGs = () => {

    setFakeBG(1);

    const [activeCard, setActiveCard] = useState(cards[0]);
    const classes = useStyles(activeCard);

    const updateViewBG = (card) => updateBG(card.skyBG, card.BGAnim, card.isRaining, '#view-bg');
    const isActive = (card) => card === activeCard ? ' ' + classes.active : '';

    useEffect(() => updateViewBG(activeCard));

    return (

        <motion.div className={ classes.container }
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.1, 1] }}
            transition={{ duration: 0.5 }}
            exit={{ scale: 0 }}
        >
            <Typography variant="h3" className={ classes.heading }>
                Weather Backgrounds
            </Typography>
            <Grid container className={ classes.gridContainer } justify="center">
            { cards.map(card => (

                <Grid className={ classes.gridItem }
                    item md={ 3 } sm={ 5 } xs={ 6 }
                    key={ card.title }
                >
                    <motion.div className={ classes.card + isActive(card) }
                        onClick={() => setActiveCard(card)}
                        whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
                        whileTap={{ scale: 0.9 }}
                    >
                        { card.title }
                    </motion.div>
                </Grid>
            ))}
            </Grid>
        </motion.div>
    );
}
 
export default WeatherBGs;

export { setFakeBG };