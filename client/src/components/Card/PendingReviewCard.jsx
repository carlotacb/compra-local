import React from 'react';
import { Grid, Paper, Typography, makeStyles, Button } from '@material-ui/core';
import { ValorationDialog } from "../../components";
import { UserContext } from '../../context/UserContext';
import { ApiFactory } from "../../services/ApiFactory";


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
        textTransform: 'uppercase'
    }
}));

export function PendingReviewCard(props) {
    const classes = useStyles();
    const { user } = React.useContext(UserContext);
    const [openModal, setOpenModal] = React.useState(false);
    const [openModalVoluteer, setOpenModalVoluteer] = React.useState(false);
    const [errorModal, setErrorModal] = React.useState(false);
    const [errorModalHelper, setErrorModalHelper] = React.useState(false);
    
    const handleValorateSell = (punctuation, valoration) => {
        const valorateLocalAPI = ApiFactory.get('valorateLocal');

        const data = {
            "comment": valoration,
            "order_id": props.order_id,
            "punctuation": parseInt(punctuation),
            "writer_id": user["id"]
        }
        if (valoration === '') {
            setErrorModal(true);
        } else {
            valorateLocalAPI(data).then((res) => {
                if (!res.error) {
                    setOpenModal(false);
                    setErrorModal(false);
                }
                else setErrorModal(true);
            });
        }
    }

    const handleValorateVolunteer = (punctuation, valoration) => {
        const valorateHelperAPI = ApiFactory.get('valorateHelper');
        
        const data = {
            "comment": valoration,
            "order_group_id": props.order_group_id,
            "punctuation": parseInt(punctuation),
            "writer_id": user["id"]
        }
        
        if (valoration === '') {
            setErrorModalHelper(true);
        } else {
            valorateHelperAPI(data).then((res) => {
                if (!res.error) {
                    setOpenModalVoluteer(false);
                    setErrorModalHelper(false);
                }
                else setErrorModalHelper(true);
            });
        }        
    }

    const cancelSell = () => {
        setOpenModal(false);
        setErrorModal(false);
    }

    const cancelHelper = () => {
        setOpenModalVoluteer(false);
        setErrorModalHelper(false);
    }

    const getCardType = () => {
        if (props.type === "CLIENT") {
            return (
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.title2}> Que tal el teu voluntari? </Typography> 
                    <Typography variant="body1"> Si vols ajudar a la compra de futurs clients explica’ns que tal ha sigut la experiencia. </Typography> 
                    <Grid item xs={12} className={classes.information}>
                        <Grid item={8}>
                            <Typography variant="h4" className={classes.uppercase}> {props.helper_name} </Typography>
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
                    <Typography variant="h5" className={classes.title}> Com anat la teva compra? </Typography> 
                    <Typography variant="body1"> Si vols ajudar a la compra de futurs clients explica’ns que tal ha sigut la experiencia. </Typography> 
                    <Grid item xs={12} className={classes.information}>
                        <Grid item={8}>
                            <Typography variant="h4" className={classes.uppercase}> {props.local_name} </Typography>
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
            <ValorationDialog open={openModal} error={errorModal} title="Valora la teva compra" onAccept={(punct, comm) => handleValorateSell(punct, comm)} onClose={() => cancelSell()} />
            <ValorationDialog open={openModalVoluteer} error={errorModalHelper} title="Valora al teu voluntari" onAccept={(punct, comm) => handleValorateVolunteer(punct, comm)} onClose={() => cancelHelper()} />
        </Paper>
    )
}