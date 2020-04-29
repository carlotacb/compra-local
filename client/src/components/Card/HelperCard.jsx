import React, { useState, useContext } from 'react';
import { Divider, Grid, Paper, Typography, makeStyles, Avatar } from '@material-ui/core';
import { PrimaryButton } from '../../shared-components/Button/PrimaryButton';
import { ConfirmationDialog } from '../../components'
import { ApiFactory } from "../../services/ApiFactory";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        marginBottom:theme.spacing(3),
        padding: theme.spacing(2)
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
        paddingTop: theme.spacing(1), 
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
    },
    client: {    
        display: 'flex',
	    flexDirection: 'row',      
	    alignItems: 'center',
	    alignContent: 'center'
    },
    marginLeft: {
        marginLeft: theme.spacing(3)
    },
    avatarSize: {
        width: '3em',
        height: '3em'
    }
}));

export function HelperCard(props) {
    const classes = useStyles();
    const [ openModal, setOpenModal ] = useState(false);

    const getHelperInformation = () => {
        const user = props.user;
        return (
            <Grid item direction="row-reverse">
                <Grid item>
                    <Avatar src={'data:image/png;base64,'+ user.image}/>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body1"> Nom: {user.name} </Typography> 
                    <Typography variant="body1"> Correu: {user.email_address} </Typography> 
                    <Typography variant="body1"> Telèfon: {user.phone_number} </Typography> 
                </Grid>      
            </Grid>
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
                    <Typography variant="body1"> Adreça: {response[i].postal_address} </Typography>                         
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
        if (status === "CANCELLED") return "Cancel·lat"
        if (status === "DELIVERING") return "Enviat"
        if (status === "PENDING_STORE") return "Pendent de confirmació"
        if (status === "PENDING_HELPER") return "Pendent d'ajudant"
    }

    const handleAccept = () => {
        const finishHelpAPI = ApiFactory.get('finishHelp');
        finishHelpAPI(props.orderID).then((res) => {
            if (!res.error) window.location.reload(true);
        });
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
                        <Typography variant="h6"> Adreça Final: {props.user.postal_address} </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={0} alignContent="center">
                    <Divider variant="middle" orientation="vertical" />
                </Grid>
                <Grid item xs={3} className={classes.information} direction="column">
                    <Typography variant="h6" className={classes.tag}> Pagament Anticipat </Typography>   
                    <Typography variant="caption" className={classes.paddingBottom}> Si us plau, contacta amb la persona per saber com aconseguir els diners de manera anticipada. </Typography> 
                    <Typography variant="body1" className={classes.title}> CLIENT/A: </Typography> 
                    <Grid item className={classes.client}>
                        <Grid item xs={10}>
                            <Typography variant="body1"> Nom: {props.user.name} </Typography> 
                            <Typography variant="body1"> Correu: {props.user.email_address} </Typography> 
                            <Typography variant="body1"> Telèfon: {props.user.phone_number} </Typography> 
                        </Grid>      
                        <Grid item xs={2} className={classes.marginLeft}>
                            <Avatar className={classes.avatarSize} src={'data:image/png;base64,'+ props.user.image}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <ConfirmationDialog open={openModal} cancel={() => setOpenModal(false)} accept={() => handleAccept()} title={'Comanda entregada'} message={'Has entregat la comanda al client? si es que no, cancela!'}/>
        </Paper>
    )
}