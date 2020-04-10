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
        padding: theme.spacing(2),
        height: '95%',
        backgroundColor: theme.palette.secondary.light,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    item: {
        display: 'flex'
    },
    ul: {
        listStyleType: 'none'
    },
    button: {
        '& svg': {
            paddingRight: theme.spacing(1)
        }
    }
}));


export function Sidebar() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.item}>
                <ul className={classes.ul}>
                    <li>
                        <Button className={classes.button}  href="/in/">
                            <StoreIcon /> Comprar
                        </Button>
                    </li>
                    <li>
                        <Button className={classes.button}  href="/in/compte">
                            <PersonIcon /> El meu compte
                        </Button>
                    </li>
                    <li>
                        <Button className={classes.button}  href="/in/comandes">
                            <AvTimerIcon /> Comandes
                        </Button>
                    </li>
                    <li>
                        <Button className={classes.button} href="/in/veinat">
                            <GroupIcon /> Veïnat
                        </Button>
                    </li>

                </ul>
            </div>

            <div className={classes.item}>
                <ul className={classes.ul}>
                    <li>
                        <Button className={classes.button}  href="/in/todo">
                            <HelpIcon /> Ajuda
                        </Button>
                    </li>
                    <li>
                        <Button className={classes.button}  href="/in/todo">
                            <ExitToAppIcon /> Tanca sessió
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

