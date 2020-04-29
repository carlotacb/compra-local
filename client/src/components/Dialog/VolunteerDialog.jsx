import React from 'react';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography }  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    title: {
        color: theme.palette.primary.main,
        paddingBottom: 0
    },
    subtitle: {
        marginBottom: theme.spacing(1),
        marginTop: 0
    }
}));
  
export function VolunteerDialog(props) {
    const classes = useStyles();
    const rows = props.ticket;

    const renderVolunteerInfo = () => {
        return (
            <Grid container direction="column">
                <Grid item className={classes.subtitle}>
                    <Typography variant ="subtitle2">
                        Aquesta és la informació del teu voluntari assignat. Si us plau, possat en contacte amb
                        ell per tractar el pagament amb antelació.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1">
                        <b>Nom: </b> {props.helper.name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1">
                        <b>Telèfon: </b> {props.helper.phone_number}
                    </Typography>
                </Grid>
            </Grid>
        )
    }

    return (
        <Dialog fullWidth open={props.open} onClose={props.close} aria-labelledby="customized-dialog-title" >
        <DialogTitle id="customized-dialog-title" className={classes.title}> <b>{props.title}</b> </DialogTitle>
        <DialogContent>
            {renderVolunteerInfo()}
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={props.onClose} color="primary"> Tancar </Button>
        </DialogActions>
        </Dialog>
    );
}
