import React from 'react';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        backgroundColor: '#F9F9F9'
    },
}));

export function NoInfoCard(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Grid container direction="row" justify="center">
                <Grid item  className={classes.local}>
                    <Typography variant="h5">
                        {props.information}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}