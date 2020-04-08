import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
}));


function SidebarItem(props) {

    const classes = useStyles();
    
    return (
        <li className={classes.root}>
            <Typography variant="body2">
                {props.children}
            </Typography>
        </li>
    )
}


export default SidebarItem;