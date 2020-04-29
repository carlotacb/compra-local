import React from 'react';
import { makeStyles, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { PrimaryButton } from '../../shared-components/Button/PrimaryButton';
import { checkChangePassword } from '../../utils/forms/changePassword';


const useStyles = makeStyles((theme) => ({
    root: {
       borderRadius: 0,
    paddingBottom: theme.spacing(2)
    },
    title: {
        color: theme.palette.primary.main, 
        fontWeight: 'bold',
        paddingBottom: 0
    },
    bottom: {
        paddding: theme.spacing(2)
    },
    secondButton: {
        borderRadius: 0
    }
}));


export function AcceptConfirmDialog(props) {
    const classes = useStyles();

    return (
        <Dialog 
            fullWidth 
            open={props.open} 
            onClose={props.onClick} 
            classes={{
                paper: classes.root
            }}
        >
            <DialogTitle className={classes.title}>{props.title}</DialogTitle>
                <DialogContent>
                        {props.children}
                </DialogContent>
                <DialogActions className={classes.bottom}>
                    <PrimaryButton onClick={props.onAccept} color="primary">
                        Aceptar
                    </PrimaryButton>
                    <Button className={classes.secondButton} onClick={props.onClose} color="primary">
                        Cancel·lar
                    </Button>
                </DialogActions>
        </Dialog>
    )
}