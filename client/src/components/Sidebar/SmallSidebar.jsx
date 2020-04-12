
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';
import PersonIcon from '@material-ui/icons/Person';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import GroupIcon from '@material-ui/icons/Group';
import HelpIcon from '@material-ui/icons/Help';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1)
    },
}));


export function SmallSidebar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button className={classes.root} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem href="/in/" onClick={handleClose}><StoreIcon /> Comprar</MenuItem>
                <MenuItem href="/in/compte" onClick={handleClose}><PersonIcon /> El meu compte</MenuItem>
                <MenuItem href="/in/comandes" onClick={handleClose}><AvTimerIcon /> Comandes</MenuItem>
                <MenuItem href="/in/veinat" onClick={handleClose}> <GroupIcon /> Veïnat</MenuItem>
                <MenuItem onClick={handleClose}> Ajuda</MenuItem>
                <MenuItem onClick={handleClose}>Tanca sessió</MenuItem>
            </Menu>
        </div>
    );
}