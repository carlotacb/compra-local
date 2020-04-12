import React from 'react';
import { Grid, Paper, Typography, makeStyles, Button, Avatar } from '@material-ui/core';
import { TicketDialog } from '../Dialog/TicketDialog';
import { ConfirmationDialog } from '../Dialog/ConfirmationDialog';
import { ApiFactory } from '../../services/ApiFactory' 

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        marginBottom:theme.spacing(3),
        padding: theme.spacing(2),
        backgroundColor: '#F9F9F9'
    },
    buttons: {
        display: 'flex',
	    flexDirection: 'column',
	    justifyContent: 'space-between',
        paddingLeft: '1.5em'
    },
    information: {
        display: 'flex',
        flexDirection: 'column', 
    },
    outlinedTag: {
        ...theme.typography.button,
        border: '1px solid rgb(151, 119, 181);',
        padding: theme.spacing(0.5),
        marginTop: theme.spacing(1),
        textAlign: 'center'
    },
    client: {
        display: 'flex',
	    flexDirection: 'row',      
	    alignItems: 'center',
	    alignContent: 'center'
    },
    marginTop: {
        marginTop: theme.spacing(1)
    },
    marginLeft: {
        marginLeft: theme.spacing(1)
    }
}));

export function ProcessOrderCard(props) {
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);
    const [openConfirmation, setOpenConfirmation] = React.useState(false);

    const handleAcceptarComanda = (nextStep) => {
        const step = parseNextStep(nextStep);
        const nextStepAPI = ApiFactory.get('nextStepOrder');
        nextStepAPI(props.orderID, step).then((res) => {
            if (!res.error) window.location.reload(true);
        });
    }

    const getType = (status) => {
        if (status === "HELPER_NEEDED") return "Recull voluntari"
        if (status === "PICK_UP") return "Per recollir"
        if (status === "DELIVERY") return "Entrega a domicili"
    }

    const getStatus = (status) => {
        if (status === "COMPLETED") return "Completat"
        if (status === "PREPARING") return "En preparació"
        if (status === "PENDING_PICKUP") return "Pendent de recollir"
        if (status === "PICKED_UP") return "Recollit"
        if (status === "CANCELLED") return "Cancelat"
        if (status === "DELIVERING") return "Enviat"
        if (status === "PENDING_STORE") return "Pendent de confirmació"
        if (status === "PENDING_HELPER") return "Pendent d'ajudant"
    }

    const nextStep = () => {
        if (props.status === "PENDING_HELPER") return "PREPARING";
        if (props.status === "PREPARING") return "PENDING_PICKUP";
        if (props.type === "DELIVERY") {
            if (props.status === "PENDING_PICKUP") return "DELIVERING";
            if (props.status === "DELIVERING") return "COMPLETED";
        }
        else {
            if (props.status === "PENDING_PICKUP") return "PICKED_UP";
            if (props.status === "PICKED_UP") return "COMPLETED"; 
        }
    }

    const parseNextStep = (status) => {
        if (status === "PENDING_PICKUP") return "READY";
        if (status === "DELIVERING" || status === "PICKED_UP") return "ON_IT"
        if (status === "COMPLETED") return "DONE"
    }

    return (
        <Paper className={classes.root}>
            <Grid container direction="row">
                <Grid item xs={3}> 
                    <Typography variant="h1">#{props.orderID}</Typography>
                    <div className={classes.outlinedTag}> {getType(props.type)} </div>
                    <Typography variant="body1" className={classes.marginTop}>{props.ticket.length} productes</Typography>
                    <Typography variant="h6">Total comanda: {props.total} €</Typography>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={4} className={classes.information}>
                    <Grid item className={classes.client}>
                        <Avatar className={classes.avatarSize} src={'data:image/png;base64,'+ props.client.image}/>
                        <Typography variant="h5" className={classes.marginLeft}> {props.client.name} </Typography>
                    </Grid>
                    <Typography variant="body" className={classes.marginTop}> Número de telèfon: {props.client.phone_number} </Typography>
                    <Typography variant="body" className={classes.marginTop}> Correu electrònic: {props.client.email_address} </Typography>
                </Grid>
                <Grid item xs={4} className={classes.buttons}>
                    <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}> VEURE TIQUET </Button>
                    <div className={classes.outlinedTag}> {getStatus(props.status)} </div>
                    {(props.status === "PENDING_HELPER") ? null : <Button variant="contained" color="secondary" onClick={() => setOpenConfirmation(true)}> Següent pas: {getStatus(nextStep())} </Button>}
                </Grid>
            </Grid>
            <TicketDialog open={openModal} onClose={() => setOpenModal(false)} ticket={props.ticket} title={'TIQUET'}/>
            <ConfirmationDialog open={openConfirmation} cancel={() => setOpenConfirmation(false)} accept={() => handleAcceptarComanda(nextStep())} title={"Passar"} message={"En acceptar la comanda, aquesta passarà a estar en estat preparant i per tant l'usuari esperarà tenir-la disponible per avui."} />
        </Paper>
    )
}