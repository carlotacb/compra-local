import React from 'react';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(2)
    },
}));

export function NoInfoCard(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root} square>
            <Grid container direction="row" justify="center">
                <Grid item  className={classes.local}>
                    <Typography variant="h6">
                        {props.information}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}