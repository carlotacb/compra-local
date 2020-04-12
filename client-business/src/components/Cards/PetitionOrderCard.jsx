import React from 'react';
import { Grid, Paper, Typography, makeStyles, Button } from '@material-ui/core';

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
	    flexDirection: 'column'
    },
    outlinedTag: {
        ...theme.typography.button,
        border: '1px solid rgb(151, 119, 181);',
        padding: theme.spacing(0.5),
        textAlign: 'center'
    },
}));

export function PetitionOrderCard(props) {
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);

    const handleAcceptarComanda = () => {
        console.log('acceptar')
    }

    return (
        <Paper className={classes.root}>
            <Grid container direction="row">
                <Grid item xs={8} className={classes.information}>
                    <Typography variant="h5"> Andreu Gallofré </Typography>
                    <Typography variant="h6"> 50 € </Typography>
                    <Grid item xs={4}> 
                        <div className={classes.outlinedTag}> HELPER NEEDED </div>
                    </Grid>
                </Grid>
                <Grid item xs={4} className={classes.buttons}>
                    <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}> VEURE TIQUET </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleAcceptarComanda()}> Acceptar comanda </Button>
                </Grid>
            </Grid>
            {/* <TicketDialog open={openModal} onClose={() => setOpenModal(false)} ticket={props.ticket} title={'TIQUET'}/>  */}
        </Paper>
    )
}