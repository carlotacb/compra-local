import React from 'react';
import { Grid, Paper, Typography, makeStyles, Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        marginBottom: theme.spacing(3),
    },
    local: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(1)
    },
    viewTicket: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(1)
    }
}));

export function CompletedOrderCard(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Grid container direction="row">
                <Grid item  className={classes.local}>
                    <Typography variant="h5"> {props.date} </Typography>
                    <Typography variant="h4"> {props.local_name} </Typography>
                    <Typography variant="h5"> {props.total} </Typography>
                </Grid>
                <Grid item className={classes.viewTicket}>
                    <Button variant="contained" color="primary"> VEURE TIQUET </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}