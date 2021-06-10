import { useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { v4 as uuid } from "uuid";

import { getRandNum } from "../lib/utilities";


const rows = 6;
const minStarSize = 1.5, maxStarSize = 3;
const minTwinkleDuration = 1.5, maxTwinkleDuration = 2.5;
const minTwinkleDelay = 3, maxTwinkleDelay = 7;

const minShootingDelay = 10, maxShootingDelay = 20;

const shootingStarVariants = {

    initial: { rotate: 45 },
    animate: ({ height, duration }) => ({
        x: [0, -height], y: [0, height],
        transition: { duration: duration }
    })
};

const generateRow = (height, width, ranges) => ({

    height,
    width: width / getRandNum(ranges.minCols, ranges.maxCols)
});

const generateStar = (rangeX, rangeY) => ({

    top: getRandNum(rangeY.min, rangeY.max),
    left: getRandNum(rangeX.min, rangeX.max),
    size: getRandNum(minStarSize, maxStarSize, false),
    twinkeOpacity: getRandNum(0.1, 0.3, false),
    twinkleDuration: getRandNum(minTwinkleDuration, maxTwinkleDuration, false),
    twinkleDelay: getRandNum(minTwinkleDelay, maxTwinkleDelay, false)
});

const NightAnim = () => {

    const container = {

        rows,
        height: window.innerHeight * 0.6,
        width: window.innerWidth
    };

    const isScreenSmall = (container.width < 600) ? true : false;

    // Twinkle Stars
    const ranges = {

        minCols: 3,
        maxCols: isScreenSmall ? 4 : 6,
        minStarCap: 1,
        maxStarCap: isScreenSmall ? 1 : 2
    };

    let stars = [];

    for(let i = 0; i < container.rows; i++) {

        const row = generateRow(container.height / container.rows, container.width, ranges);
        for(let j = 0; j < container.width; j += row.width) {

            const rangeX = { min: j, max: j + row.width };
            const rangeY = { min: row.height * i, max: row.height * (i + 1) };
            const starCap = getRandNum(ranges.minStarCap, ranges.maxStarCap);
            for(let star = 1; star <= starCap; star++)
                stars.push(generateStar(rangeX, rangeY));
        }
    }

    // Shooting Stars
    const docHeight = document.documentElement.scrollHeight + 100;  // height of shooting star = 100
    const controls = useAnimation();

    const duration = isScreenSmall ? 2.5 : 1.5;
    const minShootingOffsetX = isScreenSmall ? 70 : 50;
    const maxShootingOffsetX = isScreenSmall ? 150 : 110;

    const setShootingStar = () => {

        document.querySelector('.shooting-star-box')
                .style.left = getRandNum(minShootingOffsetX, maxShootingOffsetX) + '%';

        setTimeout(
            () => controls.start('animate'),
            getRandNum(minShootingDelay, maxShootingDelay) * 1000
        );
    };

    useEffect(setShootingStar);

    return (

        <AnimatePresence>
            <motion.div className="nightAnim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                exit={{ opacity: 0 }}
                key={ uuid() }
            >
                <div className="stars">
                    { stars.map(star => (

                        <motion.div className="star"
                            initial={{
                                top: star.top,
                                left: star.left,
                                width: star.size * 2.5,
                                height: star.size * 2.5,
                            }}
                            animate={{ opacity: [1, star.twinkeOpacity, 1] }}
                            transition={{
                                opacity: {
                                    delay: star.twinkleDelay,
                                    duration: star.twinkleDuration,
                                    repeat: Infinity,
                                    repeatDelay: star.twinkleDelay
                                }
                            }}
                            key={ uuid() }
                        >
                            <div className="star-body" />
                        </motion.div>
                    ))}
                </div>
                <div className="shooting-star-box">
                    <motion.div className="shooting-star"
                        variants={ shootingStarVariants }
                        custom={{ height: docHeight, duration }}
                        initial="initial"
                        animate={ controls }
                        onAnimationComplete={ setShootingStar }
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
 
export default NightAnim;