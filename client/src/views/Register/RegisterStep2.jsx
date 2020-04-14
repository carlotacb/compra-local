import React from 'react';

// components
import { Typography, Grid, Link, TextField, makeStyles, Paper, Button } from "@material-ui/core";
import { PrimaryButton, ErrorAlert } from '../../shared-components/';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    title: {
        width: '100%',
        marginBottom: theme.spacing(1)
    },
    subtitle: {
        marginBottom: theme.spacing(2)
    },
    form: {
        width: '80%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > button': {
            marginTop: '0.5em',
            marginBottom: '0.5em'
        }
    },
    input: {
        margin: theme.spacing(1),
        '& > div': {
            borderRadius: 0
        }
    },
    localGrid: {
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignContent: 'center'
    },
    imageNone: {
        display: 'none'
    },
    button : {
        width: 'inherit',
        display: 'flex',
        justifyContent: 'center',
        '& > button': {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(3),
            width: 'inherit',
            maxWidth: '15em'
        }
    },
    backbutton: {
        width: '100%',
        display: 'flex',
        margin: theme.spacing(3)
    },
    labelImage: {
        margin: theme.spacing(2),
        width: '100%',
        '& > span': {
            width: '100%'
        }
    
    }
}));

export function RegisterStep2(props) {

    const classes = useStyles();
    const [error, setError] = React.useState({
        phone_number: false,
        postal_address: false,
        image: false
    });
    const [user, setUser] = React.useState({
        phone_number: props.user["phone_number"],
        postal_address: props.user["postal_address"],
        image: props.user["image"]
    });

    function handleChange(e) {
        var id = e.currentTarget.id;
        var value = e.currentTarget.value;
        setUser({
            ...user,
            [id]: value
        });
    }
    const handleCapture = (target) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            var result = e.target.result;
            result = result.split(",").pop();
            setUser({
                ...user,
                "image": result
            });
        };
    };

    function handleClick() {
        var errorAux = {
            phone_number: false,
            postal_address: false,
            image: false
        };
        var existsError = false;

        // Check parameters
        if (user["phone_number"] == "" || user["postal_address"] == "") {
            errorAux["phone_number"] = "Cap camp pot estar buit";
            errorAux["postal_address"] = "Cap camp pot estar buit";
            setError(errorAux);
            existsError = true;
            return; 
        }

        var rPhoneNumber = user["phone_number"].replace("+", "");
        var sPhoneNumber = rPhoneNumber.replace(/\s/g, "");

        var r = parseInt(rPhoneNumber);
        if(r === NaN || sPhoneNumber.length < 9) {
            errorAux["phone_number"] = "El número de telèfon és invalid.";
            setError(errorAux);
            existsError = true;
            return; 
        }


        var lAddress = user["postal_address"].split(" ");
        if(lAddress.length < 4) {
            errorAux["postal_address"] = "La adreça sembla incompleta";
            setError(errorAux);
            existsError = true;
            return; 
        }
        if(user["image"] == "") {
            errorAux["image"] = "Eps! Et falta penjar la teva imatge de perfil.";
            setError(errorAux);
            existsError = true;
            return;        
        }

        if (!existsError) {
            props.onSubmit(user);
        }
    }


    return (
        <form className={classes.form}>
            <div className={classes.backbutton}>
                <Button 
                    onClick={(user)=>props.onBack(user)} 
                    startIcon={<ArrowBackIcon />}
                    color="secondary"
                    variant="contained"
                >
                    <Typography variant="subtitle1">
                        ENRERE
                    </Typography>
                </Button>
            </div>
            <Typography variant="h4" color="primary" className={classes.title}>
                <b>Estàs a un pas!</b>
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
                Ja quasi està, només queda que omplis les següents dades per poder-te mostrar les botigues més properes o poder ajudar als teus veïns.
            </Typography>

            <ErrorAlert error={error} />
            <TextField
                error={error.phone_number}
                variant="outlined"
                required
                fullWidth
                label="Número de telèfon"
                type="tel"
                id="phone_number"
                onChange={(e) => handleChange(e)}
                autoComplete="number"
                className={classes.input}
                />
            <TextField
                error={error["postal_address"]}
                variant="outlined"
                required
                fullWidth
                label="Adreça: Introdueix el carrer, el numero, codi postal i la ciutat"
                type="string"
                id="postal_address"
                onChange={(e) => handleChange(e)}
                autoComplete="address" 
                className={classes.input}
                />
            <input accept="image/*"
                className={classes.imageNone}
                id="contained-button-file"  
                multiple type="file" 
                onChange={(e) => handleCapture(e.target)} 
            />
            {(user["image"] !== '') ? <Typography variant="caption">Has pujat una imatge de perfil</Typography> : null}
            <label htmlFor="contained-button-file" className={classes.labelImage}> <Button variant="outlined" color="primary" component="span"> Penja una foto de perfil </Button> </label>
            <PrimaryButton className={classes.button} onClick={() => handleClick()}> Registra't </ PrimaryButton>
            <Grid container className={classes.localGrid}>
                <Typography>Ets un comerç? <Link href="https://admin.compralocal.cat/"> {"Registra't aquí"} </Link></Typography>
            </Grid>
        </form>
    )
}