import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export function ConfirmationDialog(props) {
    return (
        <Dialog open={props.open} onClose={props.close} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description"> {props.message} </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.cancel} color="primary" autoFocus> Cancelar </Button>
                <Button onClick={props.accept} color="primary"> Aceptar </Button>
            </DialogActions>
        </Dialog>
    )
}