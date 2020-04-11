import React from 'react';
import { Divider, Grid, Paper, Typography, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        marginBottom:theme.spacing(3),
        padding: theme.spacing(2),
        backgroundColor: '#FFFAF7'
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
        backgroundColor: '#E5E5E5',
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
        textTransform: 'uppercase'
    },
    marginBottom: {
        marginBottom: theme.spacing(2),
    }
}));

export function HelpingProcessCard(props) {
    const classes = useStyles();

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
        const orderList = []
        for (var i = 0; i < response.length; ++i) {
            orderList.push(
                <Grid item className={classes.marginBottom}>
                    <Grid item className={classes.shopName}>
                        <Typography variant="h5" className={classes.uppercase}> {response[i].name} </Typography>     
                        <Typography className={classes.tag}> {response[i].status} </Typography>     
                    </Grid>
                    <Typography variant="h6"> {response[i].total} €</Typography> 
                    <Typography variant="h6"> Direcció: {response[i].postal_adress} </Typography>                         
                </Grid>
            )
        }

        return orderList
    }

    return (
        <Paper className={classes.root}>
            <Grid container direction="row">
                <Grid item xs={8} className={classes.information}>
                    {getOrderListInformation()}
                    <Grid item>
                        <Typography variant="h5"> TOTAL: {props.total} € </Typography>
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
        </Paper>
    )
}