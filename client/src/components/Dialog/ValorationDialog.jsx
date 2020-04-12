import React from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

export function ValorationDialog(props) {
    const [punctuation, setPunctuation] = React.useState(0);
    const [comment, setComment] = React.useState();

    function handleAccept(){
        props.onAccept(punctuation, comment);
        setPunctuation(0);
        setComment('');
    }

    return (
        <Dialog fullWidth open={props.open} onClose={props.close} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus error={props.error} margin="dense" id="punctuation" label="Valoració del 0 al 5" type="number" fullWidth InputProps={{ inputProps: { min: 0, max: 5 } }} onChange={(e) => setPunctuation(e.target.value)}/>
                    <TextField error={props.error} margin="dense" id="punctuation" label="Comentari" type="text" fullWidth rows={2} onChange={(e) => setComment(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleAccept()} color="primary">
                        Aceptar
                    </Button>
                    <Button onClick={props.onClose} color="primary">
                        Cancel·lar
                    </Button>
                </DialogActions>
        </Dialog>
    )
}