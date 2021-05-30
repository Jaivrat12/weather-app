import { useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { v4 as uuid } from 'uuid';

import AppBar from "@material-ui/core/AppBar";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
import { fade, makeStyles } from "@material-ui/core/styles";

import { pink } from '@material-ui/core/colors';

import MenuIcon from "@material-ui/icons/Menu";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import WarningIcon from "@material-ui/icons/Warning";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloudIcon from '@material-ui/icons/Cloud';
import MapIcon from '@material-ui/icons/Map';
import InfoIcon from '@material-ui/icons/Info';
import SettingsIcon from '@material-ui/icons/Settings';


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
    error: {
        position: 'relative',
        marginLeft: 'auto',
        marginRight: theme.spacing(9),
        width: 'fit-content',
        padding: theme.spacing(0, 2),
        fontSize: theme.spacing(2),
        color: theme.palette.warning.light,
    },
    warningIcon: {
        left: 0,
        paddingTop: 2.5,
        fontSize: 'inherit',
        position: 'absolute',
        pointerEvents: 'none',
    },
    dummyToolbar: theme.mixins.toolbar,
    active: {
        background: '#64b5f6',
    },
    cloudIcon: {
        color: pink['A400'],
    },
}));


const Appbar = ({ handleSubmit, locationIsError, refreshData }) => {
    
    const history = useHistory();
    const location = useLocation();
    
    const classes = useStyles();

    const menuItems = [

        [
            {
                text: 'Weather',
                icon: <CloudIcon className={ classes.cloudIcon } />,
                path: '/'
            },
            {
                text: 'Map',
                icon: <MapIcon color="secondary" />,
                path: '/map'
            }
        ],
        [
            {
                text: 'Test this App',
                icon: <SettingsIcon color="secondary" />,
                path: '/test-app'
            },
            {
                text: 'About',
                icon: <InfoIcon color="secondary" />,
                path: '/about'
            }
        ]
    ];

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (isOpen) => setIsDrawerOpen(isOpen);

    const menu =  (

        <div className={ classes.list }>

            {menuItems.map(list => (
                
                <div key={ uuid() }>
                    <List>
                        {list.map(item => (

                            <ListItem
                                button
                                key={ item.text }
                                onClick={() => {
                                    history.push(item.path);
                                    toggleDrawer(false);
                                }}
                                className={
                                    location.pathname === item.path ? classes.active : null
                                }
                            >
                                <ListItemIcon>{ item.icon }</ListItemIcon>
                                <ListItemText primary={ item.text } />
                            </ListItem>
                        ))}
                    </List>
                    { list !== menuItems[menuItems.length - 1] && <Divider /> }
                </div>
            ))}
            
        </div>
    );

    const drawer = (

        <SwipeableDrawer
            anchor="left"
            open={ isDrawerOpen }
            onClose={ () => toggleDrawer(false) }
            onOpen={ () => toggleDrawer(true) }
        >
            <div className={ classes.drawerHeader }>
                <IconButton onClick={ () => toggleDrawer(false) }>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            { menu }
        </SwipeableDrawer>
    );

    return (

        <>
            <AppBar
                className={ classes.appbar }
                elevation={ 0 }
            >
                <Toolbar>

                    <IconButton
                        onClick={ () => toggleDrawer(true) }
                        edge="start"
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    { drawer }

                    <div className={ classes.search }>
                        <div className={ classes.searchField }>
                            <form
                                onSubmit={ handleSubmit }
                            >
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
                    <IconButton
                        onClick={ refreshData }
                        className={ classes.menuIcon }
                        edge="end"
                        color="inherit"
                    >
                        <RefreshIcon />
                    </IconButton>
                
                </Toolbar>

            </AppBar>

            <div className={ classes.dummyToolbar } />

            { locationIsError && (
                            
                <div className={ classes.error }>
                    <WarningIcon className={ classes.warningIcon } />
                    <div style={ {marginLeft: "8px"} }>
                        Location Not Found
                    </div>
                </div>
            )}
        </>
    );
}
 
export default Appbar;