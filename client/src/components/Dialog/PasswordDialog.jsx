import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { ApiFactory } from "../../services/ApiFactory";
import { useCookies } from 'react-cookie';

export function PasswordDialog(props) {
    const [ cookies ] = useCookies(['uisha']);
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState();
    const [errorPW, setErrorPW] = useState(false);
    const [error, setError] = useState(false);

    function handleAccept(){

        const changePasswordAPI = ApiFactory.get('changePassword');
        changePasswordAPI(cookies.iusha, currentPassword, newPassword).then((res) => {
            console.log(res)
            if (res.error) {
                setError(true)
            } else {
                props.onAccept(true);
            }
        });
    }

    const checkPasswords = (value) => {
        if (value != newPassword) {
            setErrorPW(true);
        } else {
            setErrorPW(false);
        }
    }

    return (
        <Dialog fullWidth open={props.open} onClose={props.close} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <TextField 
                        error={error}
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        name="oldPassword" 
                        label="Contrasenya actual" 
                        type="password" 
                        id="oldPassword" 
                        onChange={(e)=>setCurrentPassword(e.target.value)} />
                    <TextField 
                        error={errorPW}
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        name="password" 
                        label="Nova contrasenya" 
                        type="password" 
                        id="password" 
                        onChange={(e)=>setNewPassword(e.target.value)} />
                    <TextField 
                        error={errorPW}
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        name="password2" 
                        label="Repeteix la nova contrasenya" 
                        type="password" 
                        id="password2" 
                        onChange={(e)=>checkPasswords(e.target.value)}
                        autoComplete="current-password" />  
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