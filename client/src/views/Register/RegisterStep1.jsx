import React from 'react';

// components
import { Typography, Grid, Link, TextField, makeStyles } from "@material-ui/core";
import { PrimaryButton, ErrorAlert } from '../../shared-components/';
import { checkRegisterStep1 } from '../../utils/forms/init';

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
    localGrid: {
        marginTop: '30px',
        display: 'flex',
	    flexDirection: 'column',
	    flexWrap: 'wrap',
        alignContent: 'center'
    },
}));

export function RegisterStep1(props) {

    const classes = useStyles();
    const [error, setError] = React.useState({
        name: false,
        email_address: false,
        password: false,
        rpassword: false
    });
    const [user, setUser] = React.useState({
        name: props.user["name"],
        email_address: props.user["email_address"],
        password: props.user["password"],
        rpassword: props.user["rpassword"]
    });

    function handleClick() {

        var existsError = checkRegisterStep1(user);

        if (!existsError[0]) {
            props.onSubmit(user);
        }
        else{
            setError(existsError[1]);
        }
    }

    function handleChange(e){
        var id = e.currentTarget.id;
        var value = e.currentTarget.value;
        setUser({
            ...user,
            [id]: value
        });
    }

    return (
        <form className={classes.form}>
           
            <Typography variant="h4" color="primary" className={classes.title}>
                <b>Benvingut a <br/> compralocal.cat!</b>
            </Typography>
            <Typography variant="subtitle1"  className={classes.subtitle}>
                Si us plau, omple el següents camps per registrar la teva botiga dins de la nostre xarxa.
            </Typography>
            <ErrorAlert error={error} />
            <TextField
                error={error.name}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nom i congnoms"
                onChange={(e) => handleChange(e)}
                autoFocus 
                value={user["name"]}
                className={classes.input}
                />
            <TextField
                error={error.email_address}
                variant="outlined"
                type="email"
                required
                fullWidth
                id="email_address"
                label="Correu Electrònic"
                autoComplete="email"
                value={user["email_address"]}
                onChange={(e) => handleChange(e)}
                className={classes.input}
                />
            <TextField
                error={error.password}
                variant="outlined"
                required
                fullWidth
                label="Contrasenya"
                type="password"
                id="password"
                value={user["password"]}
                onChange={(e) => handleChange(e)}
                className={classes.input}
                />
            <TextField
                error={error.rpassword}
                variant="outlined"
                required
                fullWidth
                label="Repeteix la contrasenya"
                type="password"
                id="rpassword"
                onChange={(e) => handleChange(e)}
                autoComplete="password"
                value={user["rpassword"]}
                className={classes.input}
                />

            <PrimaryButton className={classes.button} onClick={() => handleClick()}> Registra't </ PrimaryButton>
            <Grid container className={classes.localGrid}>
                <Typography>Ets un comerç? <Link href="https://admin.compralocal.cat/"> {"Registra't aquí"} </Link></Typography>
            </Grid>
        </form>
    )
}