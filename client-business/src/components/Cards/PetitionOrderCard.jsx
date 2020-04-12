import React from 'react';
import { Grid, Paper, Typography, makeStyles, Button, Avatar } from '@material-ui/core';
import { TicketDialog } from '../Dialog/TicketDialog';

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

export function PetitionOrderCard(props) {
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);

    const handleAcceptarComanda = () => {
        console.log('acceptar')
    }

    const getStatus = (status) => {
        if (status === "HELPER_NEEDED") return "Demana voluntari"
        if (status === "PICK_UP") return "Per recollir"
        if (status === "DELIVERY") return "Entrega a domicili"
    }

    return (
        <Paper className={classes.root}>
            <Grid container direction="row">
                <Grid item xs={8} className={classes.information}>
                    <Grid item className={classes.client}>
                        <Avatar className={classes.avatarSize} src={'data:image/png;base64,'+ props.client.image}/>
                        <Typography variant="h5" className={classes.marginLeft}> {props.client.name} </Typography>
                    </Grid>
                    <Typography variant="h6" className={classes.marginTop}> Total comanda: {props.total} € </Typography>
                    <Grid item xs={4}> 
                        <div className={classes.outlinedTag}> {getStatus(props.status)} </div>
                    </Grid>
                </Grid>
                <Grid item xs={4} className={classes.buttons}>
                    <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}> VEURE TIQUET </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleAcceptarComanda()}> Acceptar comanda </Button>
                </Grid>
            </Grid>
            <TicketDialog open={openModal} onClose={() => setOpenModal(false)} ticket={props.ticket} title={'TIQUET'}/>
        </Paper>
    )
}