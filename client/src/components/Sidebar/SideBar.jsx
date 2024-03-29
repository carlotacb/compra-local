import React from "react";

import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from "@material-ui/core";
import StoreIcon from '@material-ui/icons/Store';
import PersonIcon from '@material-ui/icons/Person';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import GroupIcon from '@material-ui/icons/Group';
import HelpIcon from '@material-ui/icons/Help';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        position: 'fixed',
        backgroundColor: theme.palette.secondary.light,
        height: '100%',
        boxShadow: '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)'
    },
    container:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'inherit',
        padding: theme.spacing(1),
        paddingRight: theme.spacing(5),

    },
    item: {
        display: 'flex',
        marginTop: theme.spacing(3)
    },
    ul: {
        listStyleType: 'none'
    },
    button: {
        width: '100%',
        marginTop: theme.spacing(0.5),
        borderRadius: 0,
        justifyContent: 'flex-start',
        '& svg': {
            paddingRight: theme.spacing(1)
        },
        '&:hover': {
            borderRadius: 0,
            color: theme.palette.primary.dark
        },
    },
    buttonBg : {
        width: '100%',
        marginTop: theme.spacing(0.5),
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        borderRadius: 0,
        justifyContent: 'flex-start',
        '& svg': {
            paddingRight: theme.spacing(1)
        },
        '&:hover': {
            borderRadius: 0,
            color: theme.palette.primary.dark
        },
    },
    itemBottom: {
        marginBottom: theme.spacing(5),
        display: 'flex'
    }
}));


export function Sidebar(props) {
    const [cookies, setCookie, removeCookie] = useCookies();
    const history = useHistory();
    const classes = useStyles();

    const handleLogout = () => { 
        removeCookie("iusha");
        setTimeout(function(){  history.push("/login"); }, 1500);
    }


    return (
        <div className={classes.root}>
            <div className={classes.container}>
            <div className={classes.item}>
                <ul className={classes.ul}>
                    <li>
                            { (props.path === "/in/") ?
                                <Button className={classes.buttonBg}  href="/in/">
                                        <StoreIcon /> Comprar
                                </Button>                :
                                <Button className={classes.button}  href="/in/" onClick={(e)=>props.onClick(e)}>
                                    <StoreIcon /> Comprar
                                </Button>
                            }
                    </li>
                    <li>
                        { (props.path === "/in/compte") ?
                                <Button className={classes.buttonBg}  href="/in/compte">
                                    <PersonIcon /> El meu compte
                                </Button>                :
                                <Button className={classes.button} href="/in/compte" onClick={(e)=>props.onClick(e)}>
                                    <PersonIcon /> El meu compte
                                </Button>
                        }
                    </li>
                    <li>
                        { (props.path === "/in/comandes") ?
                                <Button className={classes.buttonBg} href="/in/comandes">
                                    <AvTimerIcon /> Comandes
                                </Button>                :
                                <Button className={classes.button} href="/in/comandes" onClick={(e)=>props.onClick(e)}>
                                    <AvTimerIcon /> Comandes
                                </Button>
                        }
                    </li>
                    <li>
                        { (props.path === "/in/veinat") ?
                                <Button className={classes.buttonBg}href="/in/veinat">
                                    <GroupIcon /> Veïnat
                                </Button>                :
                                <Button className={classes.button} href="/in/veinat" onClick={(e)=>props.onClick(e)}>
                                    <GroupIcon /> Veïnat
                                </Button>
                        }
                    </li>

                </ul>
            </div>

            <div className={classes.itemBottom}>
                <ul className={classes.ul}>
                    <li>
                        <Button className={classes.button}  href="https://compralocal.cat/" target="_blank">
                            <HelpIcon /> Ajuda
                        </Button>
                    </li>
                    <li>
                        <Button className={classes.button}  onClick={() => handleLogout()}>
                            <ExitToAppIcon /> Tanca sessió
                        </Button>
                    </li>
                </ul>
            </div>
            </div>
        </div>
    )
}

