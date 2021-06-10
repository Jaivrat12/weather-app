import { useState } from "react";
import { motion } from "framer-motion";

import cloud from '../Assets/Clouds/cloud.png';


const cloudVariants = {

    hidden: {
        opacity: 0,
        scale: 0
    },
    visible: {
        opacity: 0.45,
        scale: 1,
        x: '100vw',
        transition: {
            opacity: {
                duration: 1.25,
            },
            scale: {
                duration: 1.25,
            },
            x: {
                duration: 90,
                ease: 'linear',
            }
        },
    },
    visibleInfinite: {
        opacity: 0.45,
        scale: 1,
        x: ['-100vw', '100vw'],
        transition: {
            x: {
                duration: 110,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 5,
            }
        },
    },
};

const DayAnim = () => {

    const [anim, setAnim] = useState(cloudVariants.visible);

    return (

        <div className="dayAnim">
            <motion.img src={ cloud } alt=""
                variants={ cloudVariants }
                initial="hidden"
                animate={ anim }
                onAnimationComplete={() => setAnim(cloudVariants.visibleInfinite)}
            />
        </div>
    );
};
 
export default DayAnim;