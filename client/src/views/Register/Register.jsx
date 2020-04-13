import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { ApiFactory } from '../../services/ApiFactory';
import { useCookies } from 'react-cookie';

import sjcl from 'sjcl';

// components
import { Grid,  Paper, makeStyles } from "@material-ui/core";
import { RegisterStep1 } from './RegisterStep1';
import { RegisterStep2 } from "./RegisterStep2";

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

    input: {
        display: 'none',
    },
    margins: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(6)
    }
  }));

export function Register() {
    const classes = useStyles();
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['iusha']);

    const [user, setUser] = React.useState({
        name: "",
        email_address: "",
        image: "",
        password: "",
        rpassword: "",
        postal_address: "",
        phone_number: ""
    })

    const [step, setStep] = React.useState(0);
    const [error, setError] = useState(false);
    

    function handleRegister(aUser) {

        const bitArray = sjcl.hash.sha256.hash(user["password"]);
        const hash = sjcl.codec.hex.fromBits(bitArray);

        const data = {
            "email_address": aUser["email_address"],
            "image": aUser["image"],
            "name": aUser["name"],
            "password": hash,
            "phone_number": aUser["phone_number"],
            "postal_address": aUser["postal_address"],
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


    function handleSubmit(info) {
        var aUser = user;
        for(var i in info) {
            aUser[i] = info[i];
        }
        if(step == 0) {
            setStep(1);
        }
        else {
            handleRegister(aUser);
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} className={classes.paper} elevation={6} square>
                {
                    step == 0 ?
                    <RegisterStep1 onSubmit={(info)=>handleSubmit(info)}/> :
                    <RegisterStep2 onSubmit={(info)=>handleSubmit(info)}/>
                }
            </Grid>
        </ Grid> 
    )
}

