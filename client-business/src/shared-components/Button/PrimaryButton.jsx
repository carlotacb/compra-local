import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '0',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
}));

export function PrimaryButton(props) {
    const classes = useStyles();
    return (
        <Button 
            className={classes.root} 
            variant="contained" 
            color="primary" 
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </Button>
    )
}
