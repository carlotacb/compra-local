import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { PrimaryButton } from '../../shared-components/Button/PrimaryButton'
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";


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
      width: '80%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
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
    const {user, setUser} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const classes = useStyles();

    const handleLogin = () => {
        console.log(email + " " + password);
        if (email === "carlota@hackupc.com" && password === "123") {
            setError(false);
            setUser({ email: email, password: password });
            console.log(user)
        } else {
            setError(true);
        }   
    }

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
                        id="email" 
                        label="Correu Electrònic" 
                        name="email" 
                        autoComplete="email" 
                        onChange={(e)=>setEmail(e.target.value)}
                        autoFocus />
                    <TextField 
                        error={error}
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
                    <PrimaryButton onClick={() => handleLogin()}> Entra </ PrimaryButton>
                    <Grid container>
                        <Grid item xs>
                            {/* <Link href="#" variant="body2"> Forgot password? </Link> */}
                        </Grid>
                        <Grid item>
                            <Link href="/registre"> {"No disposes d'un compte? Registra't"} </Link>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.localGrid}>
                        <Typography>Ets un comerç? <Link href="https://admin.compralocal.cat/"> {"Incia sessió aquí"} </Link></Typography> 
                    </Grid>
                </form>
                {/*<h1>Entra a Compra Local</h1>
                <pre>{JSON.stringify(user, null, 2)}</pre>
                <button onClick={() => { setUser({ id: 4, username: "bob", email: "me@bob.com" });}}>Login</button> */}
            </Grid>
        </ Grid>
    )
}