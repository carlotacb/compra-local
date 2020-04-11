import React from 'react';
import { Divider, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { TertiaryButton } from "../../shared-components";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(2)
    },
    summary: {
        display: 'flex',
	    flexDirection: 'row',
	    flexWrap: 'nowrap',
	    justifyContent: 'space-between',
	    alignItems: 'stretch',
	    alignContent: 'stretch',
    }
}));

export function OrderCard(props) {
    const classes = useStyles();

    const resumcompra = () => {
        return (
            [
                <Grid item className={classes.summary}>
                    <Typography variant="body1"> Pebrots 2kg </Typography>  
                    <Typography variant="body1"> 5€ </Typography>
                </Grid>,
                <Grid item className={classes.summary}>
                    <Typography variant="body1"> Pebrots 2kg </Typography>  
                    <Typography variant="body1"> 5€ </Typography>
                </Grid>
            ]
        )
    }

    return (
        <Paper className={classes.root}>
            <Grid container direction="row">
                <Grid item>
                    <Typography variant="h5">
                        {'stepper'}
                    </Typography>  
                </Grid>
                <Grid item>
                    <Divider variant="middle" orientation="vertical" />
                </Grid>
                <Grid item>
                    <TertiaryButton> Pendent de Confirmació </TertiaryButton>
                    <Typography variant="h6"> Comanda realitzada a: </Typography> 
                    <Typography variant="h4"> Bona Fruita Busquets </Typography> 
                    <Typography variant="h5"> 53.20€ </Typography> 
                    <Typography variant="h6"> Resum de la compra: </Typography> 
                    {resumcompra()}
                </Grid>
            </Grid>
        </Paper>
    )
}