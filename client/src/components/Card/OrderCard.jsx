import React from 'react';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(2)
    }
}));

export function OrderCard(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Grid container direction="row">
                <Grid item>
                    <Typography variant="h5">
                        {'stepper'}
                    </Typography>  
                </Grid>
                <Grid item>
                <Typography variant="h5">
                        {'rest of information'}
                    </Typography>  
                </Grid>
            </Grid>
        </Paper>
    )
}