import React, { useState } from 'react';
import { Grid, Paper, Typography, makeStyles, Button } from '@material-ui/core';
import { TicketDialog } from '..';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        marginBottom: theme.spacing(3),
        backgroundColor: '#F9F9F9'
    },
    local: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(1)
    },
    viewTicket: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    localName: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(1)
    }
}));


export function CompletedOrderCard(props) {
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);

    return (
        <Paper className={classes.root}>
            <Grid container direction="column">
                <Grid item  className={classes.local}>
                    <Typography variant="h5"> {props.date} </Typography>
                    <Typography variant="h4" className={classes.localName}> {props.local_name} </Typography>
                    <Typography variant="h5"> {props.total}€ </Typography>
                </Grid>
                <Grid item className={classes.viewTicket}>
                    <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}> VEURE TIQUET </Button>
                </Grid>
            </Grid>
            <TicketDialog open={openModal} onClose={() => setOpenModal(false)} ticket={props.ticket} title={'TIQUET'}/>
        </Paper>
    )
}