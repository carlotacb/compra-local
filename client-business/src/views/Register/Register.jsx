import React, { useContext, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { UserContext } from "../../context/UserContext";
import { PrimaryButton } from '../../shared-components/Button/PrimaryButton';
import { SpanAlert } from "../../shared-components/Span/SpanAlert";

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { ApiFactory } from "../../services/ApiFactory";


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
  }));

export function Register() {
    const {user, setUser} = useContext(UserContext);
    const [userIn, setUserIn] = useState({
        name: "",
        email: "",
        password: "",
        rpassword: ""
    })
    const [error, setError] = useState(false);
    const [errorPW, setErrorPW] = useState(false);
    const [cookies, setCookie] = useCookies(['iusha-bs']);
    const classes = useStyles();
    const history = useHistory();

    const handleRegister = () => {
        if (userIn["password"] !== userIn["rpassword"]) {
            setErrorPW(true);
            return;
        } 

        const registerAPI = ApiFactory.get("register");
        registerAPI(userIn["email"], userIn["name"], userIn["password"])
            .then((res)=> {
                console.log(res)
                if(!res["error"]){
                    setCookie('iusha-bs', res["user"], { path: '/' });
                    const getUserAPI = ApiFactory.get("getUserInformation");
                    getUserAPI(cookies["iusha-bs"])
                    .then((res)=>{
                        setUser(res);
                        history.push('/in/empresa');
                    });
                    setError(false);
                }
                else {
                    setError(true);
                }
            });
    }

    function handleChange(e){
        const id = e.currentTarget.id;
        const v = e.target.value;

        setUserIn( {
            ...userIn,
            [id]: v
        })

        if(id == "rpassword") {
            checkPasswords(v);
        }
    }

    function checkPasswords(value) {
        if (value != userIn["password"]) {
            setErrorPW(true);
        } else {
            setErrorPW(false);
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} className={classes.paper} elevation={6} square>
                <form className={classes.form}>
                    {error ? <SpanAlert message={'error'}><Typography>L'email no es vàlid</Typography></SpanAlert> : null }
                    <TextField 
                        error={error}
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        id="email" 
                        label="Nom de l'encarregat de l'empresa" 
                        name="name" 
                        onChange={(e)=> handleChange(e)}
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
                        onChange={(e)=> handleChange(e)}
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
                        onChange={(e)=> handleChange(e)} />
                    <TextField 
                        error={error || errorPW}
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        name="rpassword" 
                        label="Repeteix la contrasenya" 
                        type="password" 
                        id="rpassword" 
                        onChange={(e)=> handleChange(e)}
                        autoComplete="current-password" />
                    <PrimaryButton onClick={() => handleRegister()}> Registra't </ PrimaryButton>
                    <Grid container className={classes.localGrid}>
                        <Typography>Ets un comerç? <Link href="https://admin.compralocal.cat/"> {"Registra't aquí"} </Link></Typography> 
                    </Grid>
                </form>
            </Grid>
        </ Grid> 
    )
}

