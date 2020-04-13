import React from 'react';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { Stars } from '../../shared-components'


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        backgroundColor: '#F9F9F9'
    },
    local: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(1)
    }
}));

export function ReviewCard(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Grid container direction="row">
                <Grid item  className={classes.local}>
                    <Stars value={props.punctuation} />
                    <Typography variant="h5">
                        {props.comment}
                    </Typography>
                    <Typography variant="body1">
                        {props.writer}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}