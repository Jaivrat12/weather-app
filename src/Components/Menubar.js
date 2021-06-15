import { motion } from "framer-motion";

const sidebarVariants = {

    open: (height) => ({
        clipPath: `circle(${ height * 2 + 200 }px at 0px 0px)`,
        transition: {
            type: "spring",
            stiffness: 50
        }
    }),
    closed: {
        clipPath: "circle(0px at 0px 0px)",
        transition: {
            delay: 0.3,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};

const navVariants = {

    open: {
        transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const itemVariants = {

    open: {
        y: 0,
        opacity: 1,
        transition: { y: { stiffness: 1000, velocity: -100 } }
    },
    closed: {
        y: -50,
        opacity: 0,
        transition: { y: { stiffness: 1000 } }
    }
};

const Path = (props) => (

    <motion.path
        strokeWidth="2"
        stroke="#fff"
        strokeLinecap="round"
        { ...props }
    />
);
  
export const MenubarIcon = ({ isOpen }) => {

    // const strokeColor = isOpen ? 'hsl(0, 0%, 18%)' : '#fff';
    
    return (

        <motion.svg className="menubar-icon"
            width="23" height="23" viewBox="0 0 20 20"
            initial={ false }
            animate={ isOpen ? "open" : "closed" }
        >
            <Path
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" }
                }}
                // strokeColor={ strokeColor }
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                }}
                transition={{ duration: 0.1 }}
                // strokeColor={ strokeColor }
            />
            <Path
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" }
                }}
                // strokeColor={ strokeColor }
            />
        </motion.svg>
    )
};

const Menubar = ({ isOpen, toggleOpen, children }) => {

    return (

        <>
        <motion.div className="backdrop"
            onClick={() => toggleOpen()}
            style={ isOpen ? { display: 'block' } : { display: 'none' } }
            animate={ isOpen ? { opacity: 1 } : { opacity: 0 } }
        />
        <motion.nav
            variants={ sidebarVariants }
            initial={ false }
            animate={ isOpen ? "open" : "closed" }
            custom={ window.innerHeight }
        >
            <motion.ul variants={ navVariants }>
                { children.map(child => (

                    <motion.li
                        variants={ itemVariants }
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        key={ child.key }
                    >
                        { child }
                    </motion.li>
                ))}
            </motion.ul>
        </motion.nav>
        </>
    );
};

export default Menubar;