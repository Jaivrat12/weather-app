import { useHistory, useLocation, Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
import { fade, makeStyles } from "@material-ui/core/styles";

import { useCycle } from "framer-motion";

import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from '@material-ui/icons/Home';
import CloudIcon from '@material-ui/icons/Cloud';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InfoIcon from '@material-ui/icons/Info';

import Menubar, { MenubarIcon } from './Menubar';


const useStyles = makeStyles((theme) => ({

    appbar: {
        backgroundColor: 'transparent',
    },
    search: {
        marginLeft: 'auto',
        width: '100%',
        [theme.breakpoints.up('480')]: {
            width: 'auto',
        },
    },
    searchField: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('480')]: {
            width: '18ch',
            '&:focus': {
                width: '27ch',
            },
        },
    },
	iconBtn: {
		marginLeft: 'auto',
	},
	icon: {
		color: 'white',
	},
    dummyToolbar: theme.mixins.toolbar,
    active: {
        background: '#fff2',
        opacity: '1 !important',
    },
    menuText: {
        '& *': {
            fontWeight: 500,
        },
    },
}));

const Appbar = ({ appbarBG, handleSubmit, refreshData }) => {
    
    const history = useHistory();
    const location = useLocation();

    const classes = useStyles();

    const colors = ["#00ff95", "#ff007a", "#00e0ff"];

    const menuItems = [

        {
            text: 'Weather',
            icon: <CloudIcon style={{ color: colors[0] }}/>,
            path: '/',
            color:  colors[0]
        },
        {
            text: 'View All BGs',
            icon: <PhotoLibraryIcon style={{ color: colors[1] }}/>,
            path: '/weather-backgrounds',
            color:  colors[1],
            classes:  classes.menuText
        },
        {
            text: 'About',
            icon: <InfoIcon style={{ color: colors[2] }}/>,
            path: '/about',
            color:  colors[2]
        }
    ];

    const [isOpen, toggleOpen] = useCycle(false, true);

    const menuList = menuItems.map(item => (

        <ListItem
            button
            onClick={() => {
                history.push(item.path);
                toggleOpen();
            }}
            className={ location.pathname === item.path ? classes.active : null }
            disabled={ location.pathname === item.path }
            style={{ color: item.color }}
            key={ item.text }
        >
            <ListItemIcon>
                { item.icon }
            </ListItemIcon>
            <ListItemText className={ item.classes } primary={ item.text } />
        </ListItem>
    ));

    document.addEventListener('scroll', () => {

        document.querySelector('header')
                .style.background = window.scrollY === 0 ? 'transparent' : appbarBG;
    });

    return (

        <>
        <AppBar className={ classes.appbar } elevation={ 0 }>
            <Toolbar>

                <IconButton onClick={() => toggleOpen()} edge="start">
                    <MenubarIcon isOpen={ isOpen } />
                </IconButton>

                <Menubar isOpen={ isOpen } toggleOpen={ toggleOpen }>
                    { menuList }
                </Menubar>

                { location.pathname === '/' && (
                    <>
                    <div className={ classes.search }>
                        <div className={ classes.searchField }>
                            <form onSubmit={ handleSubmit }>
                                <div className={ classes.searchIcon }>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Location…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </form>
                        </div>
                    </div>
                    <IconButton onClick={ refreshData }
                        edge="end" color="inherit"
                    >
                        <RefreshIcon />
                    </IconButton>
                    </>
                )}

                { location.pathname !== '/' && (
                    <Link to="/" className={ classes.iconBtn }>
                        <IconButton color="inherit">
                            <HomeIcon className={ classes.icon } />
                        </IconButton>
                    </Link>
                )}
            
            </Toolbar>

        </AppBar>

        <div className={ classes.dummyToolbar } />
        </>
    );
};
 
export default Appbar;