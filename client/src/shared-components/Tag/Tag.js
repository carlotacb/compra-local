import React from 'react';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[50],
        padding: theme.spacing(0.75),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: 'fit-content',
        textTransform: 'uppercase',
        height: 'fit-content',
    
    },
}));

export function Tag(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {props.children}
        </div>
    );
}