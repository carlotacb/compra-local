import React, { useContext, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

import { UserContext } from "../../context/UserContext";
import { SpanAlert } from "../../shared-components/Span/SpanAlert";
import { PrimaryButton } from '../../shared-components/Button/PrimaryButton'

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { ApiFactory } from '../../services/ApiFactory';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
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
        width: '80%',
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
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
    input: {
        '& > div': {
            borderRadius: 0
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

export function Login() {
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['iusha']);

    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const classes = useStyles();

    const handleLogin = () => {

        const loginApi = ApiFactory.get('login');
        loginApi(email, password).then((res) => {
            if(!res["error"]) {
                setError(false);
                setCookie('iusha-bs', res["user"], { path: '/' });
                const getUserAPI = ApiFactory.get("getUserInformation");
                getUserAPI(cookies["iusha-bs"])
                .then((res)=>{
                    setUser(res);
                    history.push('/in/');
                });
            }
            else if(res["message"] == "password"){
                setError(true);
            }
        })
    }

    if("iusha-bs" in cookies) {
        return <Redirect to="/in" />
    }
    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} className={classes.paper} elevation={6} square>
                <form className={classes.form}>
                    {error ? <SpanAlert message={'error'}><Typography>El email o password no son correctes</Typography></SpanAlert> : null }
                    <TextField 
                        error={error}
                        className = {classes.input}
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
                        error={error}
                        className = {classes.input}
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        name="password" 
                        label="Contrasenya" 
                        type="password" 
                        id="password" 
                        onChange={(e)=>setPassword(e.target.value)}
                        autoComplete="current-password" />

                    <div className={classes.button}>
                        <PrimaryButton onClick={() => handleLogin()}> Entra </ PrimaryButton>
                    </div>
                    <Grid container
                        justify="flex-end"
                    >
                        <Grid item>
                            <Link href="/registre"> {"No disposes d'un compte? Registra't"} </Link>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.localGrid}>
                        <Typography>Ets un client usuari? <Link href="https://app.compralocal.cat/"> {"Incia sessió aquí"} </Link></Typography> 
                    </Grid>
                </form>
            </Grid>
        </ Grid>
    )
}