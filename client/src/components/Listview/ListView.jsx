import React from 'react';
import { makeStyles, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.light,
        padding: theme.spacing(4)
    },
}));

export function ListView(props) {
    const classes = useStyles();

    return (
        <Grid
            container 
            direction="column"
            className={classes.root}
        >
            {props.children}
        </Grid>
    )
}