import { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuid } from 'uuid';

import LoopIcon from '@material-ui/icons/Loop';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import WarningIcon from "@material-ui/icons/Warning";
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';


const Loader = ({ status }) => {

    const [isVisible, setIsVisible] = useState(true);

    const [text, setText] = useState('Loading Data');
    const [Icon, setIcon] = useState(LoopIcon);
    const [BGColor, setBGColor] = useState('#a6a6ff');

    useEffect(() => {

        if(status === 'loading') {

            setIsVisible(true);
            setText('Loading Data');
            setIcon(LoopIcon);
            setBGColor('#a6a6ff');
        }
        else if(isVisible) {

            if(status === 'error') {

                setText('Something went Wrong!');
                setIcon(CancelRoundedIcon);
                setBGColor('#ee1255');
            }
            else if(status === 'invalid') {

                setText('Invalid Location!');
                setIcon(WarningIcon);
                setBGColor('#eeae44');
            }
            else if(status === 'loaded') {

                setText('Data Loaded!');
                setIcon(CheckCircleRoundedIcon);
                setBGColor('#50C878');
            }
            setTimeout(() => setIsVisible(false), 3000);
        }
    }, [isVisible, status]);

    return (

        <AnimatePresence>
            { isVisible && (

                <motion.div className="loader-content" style={{ background: BGColor }}
                    initial={{ x: '-50%', y: '100vh', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.5 }
                    }}
                    key= { uuid() }
                >
                    <div style={{ marginRight: '0.5rem' }}>
                        { text }
                    </div>
                    <motion.div
                        style={{ display: 'flex' }}
                        initial={ Icon === LoopIcon && { rotate: 90 } }
                        animate={ Icon === LoopIcon && {
                            rotate: -90,
                            transition: {
                                repeat: Infinity,
                                repeatDelay: 0.1,
                                duration: 0.225
                            }
                        }}
                    >
                        <Icon />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
 
export default Loader;