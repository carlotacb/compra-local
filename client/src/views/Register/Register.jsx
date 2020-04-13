import React, { useContext, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

import sjcl from 'sjcl'
import { UserContext } from "../../context/UserContext";
import { PrimaryButton } from '../../shared-components/Button/PrimaryButton';
import { SpanAlert } from "../../shared-components/Span/SpanAlert";
import { ApiFactory } from '../../services/ApiFactory';
import { useCookies } from 'react-cookie';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Link, Paper, TextField, Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://compralocal.cat/assets/img/background/background.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
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
    localGrid: {
        marginTop: '30px',
        display: 'flex',
	    flexDirection: 'column',
	    flexWrap: 'wrap',
	    justifyContent: 'flex-end',
	    alignItems: 'flex-end',
	    alignContent: 'center',
    },
    input: {
        display: 'none',
    },
    margins: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(6)
    }
  }));

export function Register() {
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['iusha']);
    const [nomCongnoms, setNomCongonms] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState(false);
    const [errorPW, setErrorPW] = useState(false);
    const classes = useStyles();

    const handleRegister = () => {

        const bitArray = sjcl.hash.sha256.hash(password)
        const hash = sjcl.codec.hex.fromBits(bitArray)

        const data = {
            "email_address": email,
            "image": image,
            "name": nomCongnoms,
            "password": hash,
            "phone_number": phoneNumber,
            "postal_address": address,
            "type": "CLIENT"
        }

        const registerAPI = ApiFactory.get('register');
        registerAPI(data).then((res) => {
            if(!res["error"]) {
                setError(false);
                setCookie('iusha', res.user, { path: '/' });
                history.push('/in');
            }
            else {
                setError(true);
            }
        })   
    }

    if("iusha" in cookies) {
        return <Redirect to="/in" />
    }
    const checkPasswords = (value) => {
        if (value != password) {
            setErrorPW(true);
        } else {
            setErrorPW(false);
        }
    }

    const handleCapture = (target) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            var result = e.target.result;
            result = result.split(",").pop();
            setImage(result);
        };
    };

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} className={classes.paper} elevation={6} square>
                <form className={classes.form}>
                    <TextField 
                        error={error}
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        id="name" 
                        label="Nom i congnoms" 
                        name="name" 
                        onChange={(e)=>setNomCongonms(e.target.value)}
                        autoFocus />
                    <TextField 
                        error={error}
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        id="email" 
                        label="Correu Electrònic" 
                        name="email" 
                        autoComplete="email" 
                        onChange={(e)=>setEmail(e.target.value)}
                        autoFocus />
                    <TextField 
                        error={error || errorPW}
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        name="password" 
                        label="Contrasenya" 
                        type="password" 
                        id="password" 
                        onChange={(e)=>setPassword(e.target.value)} />
                    <TextField 
                        error={error || errorPW}
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        name="password2" 
                        label="Repeteix la contrasenya" 
                        type="password" 
                        id="password2" 
                        onChange={(e)=>checkPasswords(e.target.value)}
                        autoComplete="current-password" />
                    <TextField 
                        error={error}
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        name="phone_number" 
                        label="Número de telèfon" 
                        type="number" 
                        id="phone_number" 
                        onChange={(e)=>setPhoneNumber(e.target.value)}
                        autoComplete="current-password" />
                    <TextField 
                        error={error}
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        name="address" 
                        label="Adreça: Introdueix el carrer, el numero, codi postal i la ciutat" 
                        type="string" 
                        id="address" 
                        onChange={(e)=>setAddress(e.target.value)}
                        autoComplete="current-password" />
                    <input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file" onChange={(e) => handleCapture(e.target)}/>
                    {(image !== '') ? <Typography variant="caption">Has pujat una imatge de perfil</Typography> : null}
                    <label htmlFor="contained-button-file" className={classes.margins}> <Button variant="outlined" color="primary" component="span"> Penja una foto de perfil </Button> </label>
                    <PrimaryButton onClick={() => handleRegister()}> Registra't </ PrimaryButton>
                    <Grid container className={classes.localGrid}>
                        <Typography>Ets un comerç? <Link href="https://admin.compralocal.cat/"> {"Registra't aquí"} </Link></Typography> 
                    </Grid>
                </form>
            </Grid>
        </ Grid> 
    )
}

