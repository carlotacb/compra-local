import React, { useState } from 'react';
import { Typography, makeStyles, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { ApiFactory } from "../../services/ApiFactory";
import { useCookies } from 'react-cookie';
import { PrimaryButton } from '../../shared-components/Button/PrimaryButton';
import { ErrorAlert } from '../../shared-components/Span/ErrorAlert';
import { checkChangePassword } from '../../utils/forms/changePassword';


const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 0
    },
    textField: {
        '& > div': {
            borderRadius: 0
        }
    },
    bottom: {
        paddding: theme.spacing(2)
    }
}));


export function PasswordDialog(props) {
    const [ cookies ] = useCookies(['uisha']);
    const classes = useStyles();

    const [passInfo, setPassInfo] = React.useState({
        current: "",
        new: "",
        rnew: ""
    });

    const [error, setError] = useState({
        current: false,
        new: false,
        rnew: false
    });

    function handleAccept(){
        
        var existsErrors = checkChangePassword(passInfo);
        if(existsErrors[0]) {
            setError(existsErrors[1]);
            return;
        }
        const changePasswordAPI = ApiFactory.get('changePassword');
        changePasswordAPI(cookies.iusha, passInfo["current"], passInfo["new"]).then((res) => {
            if (res.error) {
                setError({
                    ...error,
                    "current": res.message
                })
            } else {
                props.onClick();
            }
        });
    }

    function handleChange(e) {
        var id = e.currentTarget.id;
        var value = e.currentTarget.value;

        setPassInfo({
            ...passInfo, 
            [id]: value
        });
        if(id == "rnew") {
            if(value != passInfo["new"]) {
                setError({
                    current: false,
                    new: true,
                    rnew: true
                })
            }
            else {
                setError({
                    current: false,
                    new: false,
                    rnew: false
                })
            }
        }
    }


    return (
        <Dialog 
            fullWidth 
            open={props.open} 
            onClose={props.onClick} 
            aria-labelledby="Modal per canviar la contrasenya" 
            classes={{
                paper: classes.root
            } }
        >
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">
                        Canviar contrasenya
                    </Typography>
                    <Typography variant="subtitle1">
                        Per canviar la teva contrasenya, introdueix la actual i després la nova.
                    </Typography>
                    <ErrorAlert error={error} />
                    <TextField 
                        className={classes.textField}
                        error={error["current"]}
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        label="Contrasenya actual" 
                        type="password" 
                        id="current" 
                        autoFocus
                        onChange={(e)=>handleChange(e)} />
                    <TextField 
                        className={classes.textField}
                        error={error["new"]}
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        label="Nova contrasenya" 
                        type="password" 
                        id="new" 
                        onChange={(e)=>handleChange(e)}
                        autoComplete="current-password"
                      />
                    <TextField 
                        className={classes.textField}
                        error={error["rnew"]}
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        label="Repeteix la nova contrasenya" 
                        type="password" 
                        id="rnew" 
                        onChange={(e)=>handleChange(e)} />  
                </DialogContent>
                <DialogActions className={classes.bottom}>
                    <PrimaryButton onClick={() => handleAccept()} color="primary">
                        Aceptar
                    </PrimaryButton>
                    <Button onClick={props.onClick} color="primary">
                        Cancel·lar
                    </Button>
                </DialogActions>
        </Dialog>
    )
}