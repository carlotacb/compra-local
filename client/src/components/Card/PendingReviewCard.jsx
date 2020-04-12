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
	    flexDirection: 'row',
	    flexWrap: 'wrap',
	    justifyContent: 'space-between',
	    alignItems: 'center',
	    alignContent: 'flex-start'
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
    valorationButton: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    uppercase: {
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
}));

export function PendingReviewCard(props) {
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);
    const [openModalVoluteer, setOpenModalVoluteer] = React.useState(false);

    const handleValorateSell = (punctuation, valoration) => {
        console.log(punctuation + " - " + valoration);
        setOpenModal(false);
    }

    const handleValorateVolunteer = (punctuation, valoration) => {
        console.log(punctuation + " - " + valoration);
        setOpenModalVoluteer(false);
    }

    const getCardType = () => {
        if (props.type === "CLIENT") {
            return (
                <Grid item xs={12}>
                    <Typography variant="h4" className={classes.title2}> Que tal el teu voluntari? </Typography> 
                    <Grid item xs={12} className={classes.information}>
                        <Grid item={8}>
                            <Typography variant="h5" className={classes.uppercase}> {props.helper_name} </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="secondary" className={classes.valorationButton} onClick={() => setOpenModalVoluteer(true)}> VALORA AL VOLUNTARI </Button>
                        </Grid>
                    </Grid> 
                </Grid>
            )
        } else {
            return (
                <Grid item xs={12}>
                    <Typography variant="h4" className={classes.title}> Com anat la teva compra? </Typography> 
                    <Grid item xs={12} className={classes.information}>
                        <Grid item={8}>
                            <Typography variant="h5" className={classes.uppercase}> {props.local_name} </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="primary" className={classes.valorationButton} onClick={() => setOpenModal(true)}> VALORA AL LOCAL </Button>
                        </Grid>
                    </Grid> 
                </Grid>
            )
        }
    }

    return (
        <Paper className={classes.root}>
            <Grid container direction="row">
                {getCardType()}
            </Grid>
            <ValorationDialog open={openModal} title="Valora la teva compra" onAccept={(punct, comm) => handleValorateSell(punct, comm)} onClose={() => setOpenModal(false)} />
            <ValorationDialog open={openModalVoluteer} title="Valora al teu voluntari" onAccept={(punct, comm) => handleValorateVolunteer(punct, comm)} onClose={() => setOpenModalVoluteer(false)} />
        </Paper>
    )
}