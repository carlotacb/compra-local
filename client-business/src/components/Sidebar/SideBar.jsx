import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
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
    },
    container:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'inherit',
        padding: theme.spacing(2),
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
        marginTop: theme.spacing(0.5),
        '& svg': {
            paddingRight: theme.spacing(1)
        }
    },
    buttonBg : {
        marginTop: theme.spacing(0.5),
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        borderRadius: 0,
        width: 'inherit',
        '& svg': {
            paddingRight: theme.spacing(1)
        }
    },
    itemBottom: {
        marginBottom: theme.spacing(5),
        display: 'flex'
    }
}));


export function Sidebar(props) {

    const classes = useStyles();

    const handleLogout = () => {
        window.open('https://compralocal.cat/');
    }

    return (
        <div className={classes.root}>
             <div className={classes.container}>
            <div className={classes.item}>
                <ul className={classes.ul}>
                    <li>
                            { (props.path === "/in/") ?
                                <Button className={classes.buttonBg}  href="/in/">
                                        <AvTimerIcon /> Comandes
                                </Button>                :
                                <Button className={classes.button}  href="/in/" onClick={(e)=>props.onClick(e)}>
                                    <AvTimerIcon /> Comandes
                                </Button>
                            }
                    </li>
                    <li>
                    { (props.path === "/in/botiga") ?
                                <Button className={classes.buttonBg}  href="/in/botiga">
                                        <StoreIcon /> La meva botiga
                                </Button>                :
                                <Button className={classes.button}  href="/in/botiga" onClick={(e)=>props.onClick(e)}>
                                    <StoreIcon /> La meva botiga
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

