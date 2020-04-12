
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";
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
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        history.push(e.currentTarget.id);   
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
                <MenuItem id="/in/" onClick={(e) =>handleClose(e)}><StoreIcon /> Comprar</MenuItem>
                <MenuItem id="/in/compte" onClick={(e) =>handleClose(e)}><PersonIcon /> El meu compte</MenuItem>
                <MenuItem id="/in/comandes" onClick={(e) =>handleClose(e)}><AvTimerIcon /> Comandes</MenuItem>
                <MenuItem id="/in/veinat" onClick={(e) =>handleClose(e)}> <GroupIcon /> Veïnat</MenuItem>
                <MenuItem onClick={handleClose}> Ajuda</MenuItem>
                <MenuItem onClick={handleClose}>Tanca sessió</MenuItem>
            </Menu>
        </div>
    );
}