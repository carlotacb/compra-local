import React, { useState } from 'react';
import { Divider, Grid, Paper, Typography, makeStyles, Button } from '@material-ui/core';
import { VerticalStepper, ValorationDialog } from "../../components";


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
    title2: {
        fontWeight: 'bold',
        color: '#F2B880',
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
    valorationDistribution: {
        display: 'flex',
	    flexDirection: 'row',
	    flexWrap: 'nowrap',
	    justifyContent: 'space-between',
	    alignItems: 'stretch',
	    alignContent: 'stretch',
    },
    helperBox: {
        backgroundColor: '#E5E5E5',
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

export function OrderHelpCard(props) {
    const classes = useStyles();    
    const [ openModal, setOpenModal ] = useState(false);
    const [ openModalHelper, setOpenModalHelper ] = useState(false);

    const getCurrentInformation = (currentStep) => {
        switch(currentStep) {
            case 0:
                return <div className={classes.outlinedTag}> Pendent de Confirmació </div>;
            case 1: 
                return <div className={classes.outlinedTag}> Confirmat per l'establiment </div>;
            case 2:
                return <div className={classes.secondaryTag}> La teva comanda ja està preparada! </div>;
            case 3:
                return <div className={classes.secondaryTag}> El teu voluntari ja ha recollit la comanda! </div>;
            case 4:
                return (
                    <div className={classes.valorationDistribution}>
                        <Grid item xs={5}>
                            <Typography variant="body1" className={classes.title}> Com ha anat la compra? </Typography>
                            <Typography variant="body2"> Si vols ajudar a la compra de futurs clients explica’ns que tal ha sigut la experiencia. </Typography>
                            <Button variant="contained" color="primary" className={classes.valorationButton} onClick={() => setOpenModal(true)}> ESCRIU VALORACIÓ </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant="body1" className={classes.title2}> Que tal el teu voluntari? </Typography>
                            <Typography variant="body2"> Si vols ajudar a la compra de futurs clients explica’ns que tal ha sigut la experiencia. </Typography>
                            <Button variant="contained" color="secondary" className={classes.valorationButton} onClick={() => setOpenModalHelper(true)}> ESCRIU VALORACIÓ </Button>
                        </Grid>
                    </div> 
                );
        }
    }

    const handleValorateHelper = (punctuation, valoration) =>{
        console.log(punctuation + " - " + valoration);
        setOpenModal(false);
    }

    const handleValorateSell = (punctuation, valoration) =>{
        console.log(punctuation + " - " + valoration);
        setOpenModal(false);
    }

    const resumcompra = () => {
        const ticketAPI = props.ticket;
        const ticket = [];

        for (var i = 0; i < ticketAPI.length; ++i) {
            ticket.push(
                <Grid item className={classes.summary}>
                    <Typography variant="body2"> {ticketAPI[i].product_name} - {ticketAPI[i].quantity} </Typography>  
                    <Typography variant="body2"> {ticketAPI[i].total_price}€ </Typography>
                </Grid>
            )    
        }
        return ticket
    }

    const getHelperInformation = (helper) => { 
        return (
            <div>
                <Typography variant="body2">Nom: {helper.name}</Typography>
                <Typography variant="body2">Teléfon: {helper.phone_number}</Typography>
            </div>
        );
    }

    return (
        <Paper className={classes.root}>
            <Grid container direction="row">
                <Grid item xs={3}>
                    <VerticalStepper currentStep={props.step} steps={['Compra encomanada', 'Preparació', 'Esperant recollida del voluntari', 'Enviant', 'Comanda realitzada']}/>
                </Grid>
                <Grid item>
                    <Divider variant="middle" orientation="vertical" />
                </Grid>
                <Grid item xs={8} className={classes.information}>
                    {getCurrentInformation(props.step)}
                    <div className={classes.helperBox}>
                        <Typography variant="body1" className={classes.bold}> VOLUNTARI: </Typography>
                        {props.assigned_helper ? getHelperInformation(props.helper) : <Typography variant="body1" className={classes.bold}> A l'espera de que un voluntari confirmi la comanda. </Typography>}
                    </div>
                    <Typography variant="body1" className={classes.bold}> Comanda realitzada a: </Typography> 
                    <Typography variant="h4"> {props.local_name} </Typography> 
                    <Typography variant="h5"> {props.total}€ </Typography> 
                    <Typography variant="body1" className={classes.bold}> Resum de la compra: </Typography> 
                    {resumcompra()}
                </Grid>
            </Grid>
            <ValorationDialog open={openModal} title="Valora la teva compra" onAccept={(punct, comm) => handleValorateSell(punct, comm)} onClose={() => setOpenModal(false)} />
            <ValorationDialog open={openModalHelper} title="Valora al teu voluntari" onAccept={(punct, comm) => handleValorateHelper(punct, comm)} onClose={() => setOpenModalHelper(false)} />
        </Paper>
    )
}