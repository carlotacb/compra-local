import React, { useState } from 'react';
import { Divider, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { PrimaryButton } from '../../shared-components/Button/PrimaryButton';
import { ConfirmationDialog } from '../../components'

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
        paddingLeft: '1.5em',
        '& > button': {
            marginBottom: theme.spacing(2),
        }
    },
    bold: {
        fontWeight: 'bold'
    },
    tag: {
        ...theme.typography.button,
        backgroundColor: '#F2B880',
        padding: theme.spacing(1),
        textAlign: 'center'
    },
    outlinedTag: {
        ...theme.typography.button,
        border: '1px solid rgb(151, 119, 181);',
        padding: theme.spacing(0.5),
        textAlign: 'center'
    },
    shopName: {
        display: 'flex',
	    flexDirection: 'row',
	    justifyContent: 'space-between',
    },
    title: {
        fontWeight: 'bold',
        color: 'rgb(151, 119, 181)',
    },
    paddingBottom: {
        paddingBottom: theme.spacing(2), 
    },
    uppercase: {
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    marginBottom: {
        marginBottom: theme.spacing(2),
    },
    toRight: {
        display: 'flex',
	    flexDirection: 'row',
	    justifyContent: 'flex-end',
    },
    centered: {
        display: 'flex',
	    flexDirection: 'row',
	    justifyContent: 'center',
    }
}));

export function HelperCard(props) {
    const classes = useStyles();
    const [ openModal, setOpenModal ] = useState(false);

    const getHelperInformation = () => {
        const user = props.user;
        return (
            <>
                <Typography variant="body1"> Nom: {user.name} </Typography> 
                <Typography variant="body1"> Correu: {user.email_address} </Typography> 
                <Typography variant="body1"> Telèfon: {user.phone_number} </Typography> 
            </>
        );
    }

    const getOrderListInformation = () => {
        const response = props.orderList;
        const orderList = [];
        var picked = true;       
        for (var i = 0; i < response.length; ++i) {
            orderList.push(
                <Grid item className={classes.marginBottom}>
                    <Grid item className={classes.shopName}>
                        <Typography variant="h5" className={classes.uppercase}> {response[i].name} </Typography>     
                        <Typography className={classes.outlinedTag}> {getStatus(response[i].status)} </Typography>     
                    </Grid>
                    <Typography variant="h6"> {response[i].total} €</Typography> 
                    <Typography variant="body1"> Direcció: {response[i].postal_address} </Typography>                         
                </Grid>
            )
            if (response[i].status !== "PICKED_UP") { picked = false }
        }

        if (picked) orderList.push( <PrimaryButton onClick={() => setOpenModal(true)}> Notificar entrega </PrimaryButton> )

        return orderList
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

    const handleAccept = () => {
        /* TODO: Comanda entregada */
        setOpenModal(false)
    }

    return (
        <Paper className={classes.root}>
            <Grid container direction="row">
                <Grid item xs={8} className={classes.information}>
                    {getOrderListInformation()}
                    <Grid item className={classes.toRight}>
                        <Typography variant="h5"> TOTAL: {props.total} € </Typography>
                    </Grid>
                    <Grid item className={classes.centered}>
                        <Typography variant="h6"> Direcció Final: {props.user.postal_address} </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Divider variant="middle" orientation="vertical" />
                </Grid>
                <Grid item xs={3} className={classes.information}>
                    <Typography variant="h6" className={classes.tag}> Pagament Anticipat </Typography>   
                    <Typography variant="body1" className={classes.paddingBottom}> Si us plau, contacta amb la persona per saber aconseguir els diners de manera anticipada. </Typography> 
                    <Typography variant="body1" className={classes.title}> CLIENT/A: </Typography> 
                    {getHelperInformation()}
                </Grid>
            </Grid>
            <ConfirmationDialog open={openModal} cancel={() => setOpenModal(false)} accept={() => handleAccept()} title={'Comanda entregada'} message={'Has entregat la comanda al client? si es que no, cancela!'}/>
        </Paper>
    )
}