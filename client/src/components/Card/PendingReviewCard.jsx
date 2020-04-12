import React from 'react';
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
    bold: {
        fontWeight: 'bold'
    },
    title: {
        fontWeight: 'bold',
        color: 'rgb(151, 119, 181)',
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
    const [openModal, setOpenModal] = React.useState(false);

    const handleValorateSell = (punctuation, valoration) =>{
        console.log(punctuation + " - " + valoration);
        setOpenModal(false);
    }

    return (
        <Paper className={classes.root}>
            <Grid container direction="row">
                <Grid item xs={12} className={classes.information}>
                    <Typography variant="h4" className={classes.title}> Com anat la teva compra? </Typography> 
                    <Typography variant="h5" className={classes.uppercase}> {props.local_name} </Typography>
                    <Button variant="contained" color="primary" className={classes.valorationButton} onClick={() => setOpenModal(true)}> VALORA AL LOCAL </Button>
                </Grid>
            </Grid>
            <ValorationDialog open={openModal} title="Valora la teva compra" onAccept={(punct, comm) => handleValorateSell(punct, comm)} onClose={() => setOpenModal(false)} />
        </Paper>
    )
}