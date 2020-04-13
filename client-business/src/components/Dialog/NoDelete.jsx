import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export function NoDelete(props) {
    return (
        <Dialog open={props.open} onClose={props.onClick} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
            <DialogTitle id="alert-dialog-title">Eps! No es pot eliminar el producte</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">Sembla ser que aquest producte està sent usat en alguna comanda. Fins que no es finalitzin aquelles comandes pendents on el producte està sent comprat. No es pot eliminar</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClick} color="primary"> Acceptar </Button>
            </DialogActions>
        </Dialog>
    )
}