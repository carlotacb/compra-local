import React from 'react';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        padding: theme.spacing(0.75),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: 'fit-content',
        color: 'white',
        textTransform: 'uppercase',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        height: 'fit-content'
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