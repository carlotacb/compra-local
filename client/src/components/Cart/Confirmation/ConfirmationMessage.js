import React from 'react';
import { Typography, Link, Grid } from '@material-ui/core';


export function ConfirmationOrder(props){
    return (
        <Grid container direction="column">
            <Grid item>
                <Typography variant="h6">
                    <b> La teva comanda ja està confirmada!</b>
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1">
                    Identificació de la comanda: <b>#{props.orderId}</b>
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1">
                    Pots mirar l'estat de la teva comanda  <Link to="/in/comandes"> aquí </Link>
                </Typography>
            </Grid>
        </Grid>
    )
}