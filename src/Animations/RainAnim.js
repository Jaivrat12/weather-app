import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuid } from "uuid";

import cloud from '../Assets/Clouds/cloud-long.png';
import { getRandNum } from "../lib/utilities";


const cloudVariants = {

    hidden: ({ left }) => ({
        opacity: 0,
        scale: 0,
        left: left
    }),
    visible: {
        opacity: 0.5,
        scale: 1,
        x: ['-27vw', '27vw'],
        transition: {
            opacity: { duration: 1.25 },
            scale: { duration: 1.25 },
            x: {
                duration: 70,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'reverse',
                repeatDelay: 0.15,
            }
        },
    },
};

const generateDroplet= (minX, maxX, delay) => ({

    offsetX: getRandNum(minX, maxX, false),
    offsetY: -getRandNum(0, 20, false),
    duration: getRandNum(0.3, 0.7, false),
    delay: delay,
});

const RainAnim = ({ isRaining }) => {

    let droplets = [];
    if(isRaining) {

        for(let delay = 1; delay <= 5; delay += 1)
            for(let i = 0; i < window.innerWidth; i += 50)
                droplets.push(generateDroplet(i, i + 50, delay * 0.1));
    }

    return (

        <div className="rainAnim">
            <div className="dark-clouds">
                { ['30%', '-30%'].map(cloudPosX => (
                    <motion.img src={ cloud } alt=""
                        variants={ cloudVariants }
                        custom={{ left: cloudPosX }}
                        initial="hidden"
                        animate="visible"
                        key={ uuid() }
                    />
                ))}
            </div>
            { isRaining && (

                <AnimatePresence>
                    <div className="rain" key={ uuid() }>
                        { droplets.map(droplet => (
                            <motion.div className="droplet"
                                initial={{
                                    opacity: 0,
                                    x: droplet.offsetX,
                                    y: `calc(-100% - ${ droplet.offsetY })`
                                }}
                                animate={{ opacity: 0.175, y: window.innerHeight }}
                                transition={{
                                    y: {
                                        delay: droplet.delay,
                                        duration: droplet.duration,
                                        ease: 'linear',
                                        repeat: Infinity
                                    }
                                }}
                                exit={{ opacity: 0 }}
                                key={ uuid() }
                            />
                        ))}
                    </div>
                </AnimatePresence>
            )}
        </div>
    );
};
 
export default RainAnim;