import React, { useState } from 'react';
import { Divider, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { PrimaryButton } from '../../shared-components/Button/PrimaryButton';
import { ConfirmationDialog } from '..'

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
        padding: theme.spacing(1),
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

    const getOrderListInformation = () => {
        const response = props.orderList;
        const orderList = []; 
        for (var i = 0; i < response.length; ++i) {
            orderList.push(
                <Grid item className={classes.marginBottom}>
                    <Grid item className={classes.shopName}>
                        <Typography variant="h5" className={classes.uppercase}> {response[i].name} </Typography>  
                    </Grid>
                    <Typography variant="h6"> {response[i].total} €</Typography> 
                    <Typography variant="h6"> Direcció: {response[i].postal_adress} </Typography>                         
                </Grid>
            )
        }

        return orderList
    }

    const handleAccept = () => {
        /* TODO: Accepta l'ajuda */
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
                        <Typography variant="h6"> Direcció Final: {props.user.postal_adress} </Typography>
                    </Grid>
                    <Grid item>
                        <PrimaryButton onClick={() => setOpenModal(true)}> AJUDAR! </PrimaryButton>
                    </Grid>
                </Grid>
                <Grid item>
                    <Divider variant="middle" orientation="vertical" />
                </Grid>
                <Grid item xs={3} className={classes.information}>
                    <Typography variant="h6" className={classes.tag}> Pagament Anticipat </Typography>   
                    <Typography variant="body1" className={classes.paddingBottom}> Si us plau, contacta amb la persona per saber aconseguir els diners de manera anticipada. </Typography> 
                    <Typography variant="body1" className={classes.title}> CLIENT/A: </Typography> 
                    <Typography variant="body1"> Nom: {props.user.name} </Typography> 
                </Grid>
            </Grid>
            <ConfirmationDialog open={openModal} cancel={() => setOpenModal(false)} accept={() => handleAccept()} title={'Ajudar a un vei'} message={'Et compromets a ajudar-l@? Moltes gracies! Recorda que un cop acceptat no es pot cancelar'}/>
        </Paper>
    )
}