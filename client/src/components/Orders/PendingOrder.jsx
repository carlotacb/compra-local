
import React from 'react';
import { Divider, Grid, Paper, Typography, makeStyles, Button } from '@material-ui/core';
import { VerticalStepper } from "..";
import { PrimaryButton } from '../../shared-components/Button/PrimaryButton';
import { SecondaryButton } from '../../shared-components/Button/SecondaryButton';
import { TicketDialog} from '../../components';
const useStyles = makeStyles((theme) => ({
    root:{},
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    information: {
        padding: theme.spacing(2),
        paddingTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    textInformation: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(2)
    },
    titleStore: {
        color: theme.palette.primary.dark,
    },
    totalAmount: {
        float: 'right'
    },
    alertInfo: {
        textAlign: 'center',
        padding: theme.spacing(1.2),
        width: '100%',
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.grey[800],
        fontWeight: '600'
    }
}));

export function PendingOrder(props){
    const classes = useStyles();
    const [openTicket, setOpenTicket] = React.useState(false);
    function handleOnClick(e){
        var id = e.currentTarget.id;
        if(id == "ticket"){
            setOpenTicket(true);
            return;
        }
    }

    function getSteps(){
        if(props.assigned_helper){
            return ['Compra encomanada', 'Preparació', 'Esperant recollida del voluntari', 'Comanda recollida per voluntari', 'Comanda rebuda'];
        }
        else if(props.order.delivery) {
            return ['Compra encomanada', 'Preparació', 'Preparat per enviar', 'Enviant', 'Comanda rebuda']
        }
        return ['Compra encomanada', 'Preparació', 'Per recollir', 'Recollit'];
    }

    function getCurrentInformation(currentStep) {
        var messages;
        if(props.assigned_helper) {
            messages= [
                "Pendent de confirmació per part de l'establiment",
                "Confirmat per l'establiment",
                "La comanda ja està preparada, pendent de ser recollida pel voluntari", 
                "La comanda està sent enviada pel voluntari", 
                "Comanda rebuda! No oblidis fer les teves valoracions"
            ]
        }
        else if(props.order.delivery) {
            messages = [
                "Pendent de confirmació per part de l'establiment",
                "Confirmat per l'establiment",
                "La comanda ja està preparada, pendent de ser enviada",
                "La comanda està sent enviada per l'establiment",
                "Comanda rebuda! No oblidis fer la teva valoració"
            ]
        }
        else {
            messages = [
                "Pendent de confirmació per part de l'establiment",
                "Confirmat per l'establiment",
                "Ja pots recollir la teva comanda",
                "Comanda completada! No oblidis fer la teva valoració"
            ]
        }


        return (
            <div className={classes.alertInfo}>
                {messages[currentStep]}
            </div>
        )
    }

    function getTypeOfOrder(delivery) {
        if(delivery) {
            return "Els productes serán enviats a casa teva per la botiga";
        }
        else {
            return "Recollida dels productes a la bótiga."
        }
    }

    return (
        <Paper square>
            <Grid container direction="row">
                <Grid item lg={3} sm={12}>
                    <VerticalStepper currentStep={props.order.step} steps={getSteps()}/>
                </Grid>
                <Grid item lg={7} sm={12} className={classes.information}>
                    <div className={classes.textInformation}>
                        <Typography variant="body1" className={classes.bold}> 
                            <b>Comanda realitzada a: </b>
                        </Typography> 
                        <Typography variant="h5"  className={classes.titleStore}> 
                            <b>{props.order.local_name} </b>
                        </Typography> 
                        <Typography variant="body1" className={classes.totalAmount}> 
                            Preu total de la compra: {props.order.total} € 
                        </Typography> 
                        <Typography variant="body1">
                            Métode de recollida: {getTypeOfOrder(props.order.delivery)}
                        </Typography>
                    </div>
                    <div className={classes.header}>
                        {getCurrentInformation(props.order.step)}
                    </div>
                </Grid>
                <Grid item lg={2} sm={12} className={classes.buttons}>
                    <PrimaryButton id="ticket" onClick={(e)=>handleOnClick(e)}>
                        VEURE TICKET
                    </PrimaryButton>
                </Grid>
            </Grid>
            <TicketDialog open={openTicket} onClose={() => setOpenTicket(false)} ticket={props.order.ticket} title={'TIQUET'}/>
        </Paper>
    )
}