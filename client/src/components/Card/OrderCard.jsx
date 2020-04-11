import React from 'react';
import { Divider, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { TertiaryButton } from "../../shared-components";
import { VerticalStepper } from '../../components';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        backgroundColor: '#F9F9F9'
    },
    information: {
        display: 'flex',
	    flexDirection: 'column',
	    justifyContent: 'space-between',
        paddingLeft: '1.5em'
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
                    <Typography variant="body2"> Pebrots 2kg </Typography>  
                    <Typography variant="body2"> 5€ </Typography>
                </Grid>,
                <Grid item className={classes.summary}>
                    <Typography variant="body2"> Maduixots del maresme </Typography>  
                    <Typography variant="body2"> 2.5€ </Typography>
                </Grid>
            ]
        )
    }

    return (
        <Paper className={classes.root}>
            <Grid container direction="row">
                <Grid item>
                    <VerticalStepper currentStep={2} steps={['Compra encomanada', 'Preparació', 'Per recollir', 'Recollit']}/>
                </Grid>
                <Grid item>
                    <Divider variant="middle" orientation="vertical" />
                </Grid>
                <Grid item className={classes.information}>
                    <TertiaryButton> Pendent de Confirmació </TertiaryButton>
                    <Typography variant="body1"> Comanda realitzada a: </Typography> 
                    <Typography variant="h4"> Bona Fruita Busquets </Typography> 
                    <Typography variant="h5"> 53.20€ </Typography> 
                    <Typography variant="body1"> Resum de la compra: </Typography> 
                    {resumcompra()}
                </Grid>
            </Grid>
        </Paper>
    )
}