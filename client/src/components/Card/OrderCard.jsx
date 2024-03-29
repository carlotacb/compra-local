import React from 'react';
import { Divider, Grid, Paper, Typography, makeStyles, Button } from '@material-ui/core';
import { VerticalStepper } from "../../components";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        marginBottom:theme.spacing(3),
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
    },
    bold: {
        fontWeight: 'bold'
    },
    title: {
        fontWeight: 'bold',
        color: 'rgb(151, 119, 181)',
    },
    outlinedTag: {
        ...theme.typography.button,
        border: '1px solid rgb(151, 119, 181);',
        padding: theme.spacing(1),
        textAlign: 'center'
    },
    secondaryTag: {
        ...theme.typography.button,
        backgroundColor: '#F2B880',
        padding: theme.spacing(1),
        textAlign: 'center'
    },
    valorationButton: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    uppercase: {
        textTransform: 'uppercase'
    }
}));

export function OrderCard(props) {
    const classes = useStyles();

    const getCurrentInformation = (currentStep) => {
        switch(currentStep) {
            case 0:
                return <div className={classes.outlinedTag}> Pendent de Confirmació </div>;
            case 1: 
                return <div className={classes.outlinedTag}> Confirmat per l'establiment </div>;
            case 2:
                return <div className={classes.secondaryTag}> Ja pots recollir la teva comanda! </div>;
            case 3:
                return <div className={classes.outlinedTag}> Comanda completada! No oblidis fer la teva valoració </div>;
        }
    }

    const resumcompra = () => {
        const ticketAPI = props.ticket;
        const ticket = [];

        for (var i = 0; i < ticketAPI.length; ++i) {
            ticket.push(
                <Grid item className={classes.summary}>
                    <Typography variant="body2"> {ticketAPI[i].product_name} - {ticketAPI[i].quantity} </Typography>  
                    <Typography variant="body2"> {ticketAPI[i].total_price} € </Typography>
                </Grid>
            )    
        }
        return ticket
    }

    return (
        <Paper className={classes.root}>
            <Grid container direction="row">
                <Grid item xs={3}>
                    {props.delivery ?
                        <VerticalStepper currentStep={props.step} steps={['Compra encomanada', 'Preparació', 'Preparat per enviar', 'Enviant', 'Comanda rebuda']}/> :  
                        <VerticalStepper currentStep={props.step} steps={['Compra encomanada', 'Preparació', 'Per recollir', 'Recollit']}/>
                    }
                </Grid>
                <Grid item>
                    <Divider variant="middle" orientation="vertical" />
                </Grid>
                <Grid item xs={8} className={classes.information}>
                    {getCurrentInformation(props.step)}
                    <Typography variant="body1" className={classes.bold}> Comanda realitzada a: </Typography> 
                    <Typography variant="h4" className={classes.uppercase}> {props.local_name} </Typography> 
                    <Typography variant="h5"> {props.total} € </Typography> 
                    <Typography variant="body1" className={classes.bold}> Resum de la compra: </Typography> 
                    {resumcompra()}
                </Grid>
            </Grid>
        </Paper>
    )
}