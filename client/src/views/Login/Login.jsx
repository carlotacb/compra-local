import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { ApiFactory } from '../../services/ApiFactory';
import { useCookies } from 'react-cookie';

// shared-components
import { ErrorAlert } from "../../shared-components/";
import { PrimaryButton } from '../../shared-components/Button/PrimaryButton'

// components
import { LoginInfo } from '../../components';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper, TextField, Link } from "@material-ui/core";
import { checkLogin } from "../../utils/forms/init";


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://compralocal.cat/assets/img/background/background.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        justifyContent: 'center',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center'
    },
    span: {
        color: 'white',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        backgroundColor: theme.palette.error.light,
        marginBottom: theme.spacing(1),
        textAlign: 'center',
        border: `1px solid ${theme.palette.error.dark}`
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
    }
}));

export function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['iusha']);

    const [error, setError] = useState({
        email: false,
        password: false
    });
    const [userData, setUserData] = React.useState({
        email: "",
        password: ""
    });

    const handleLogin = () => {
        // check inputs
        var errors = checkLogin(userData);
        if(errors[0]) {
            setError(
                errors[1]
            );
            return;
        }

        const loginAPI = ApiFactory.get('login');
        loginAPI(userData["email"], userData["password"])
            .then((res) => {
                if (!res["error"]) {

                    setCookie('iusha', res["user"], { path: '/' });
                    history.push('/in');
                }
                else if (res["message"] == "password") {
                    setError({
                        email: "El correu o la contrasenya indicada no són correctes.",
                        password: "El correu o la contrasenya indicada no són correctes."
                    });
                }
                else {
                    setError({
                        email: false,
                        password: false,
                        unexpected: "Vaja! Hi ha hagut un error inesperat :("
                    })
                }
            });
    }

    function handleChange(e) {
        var id = e.currentTarget.id;
        var value = e.currentTarget.value;
        setUserData({
            ...userData,
            [id]: value
        });
    }

    // You shall not pass
    if ("iusha" in cookies) {
        return <Redirect to="/in" />
    }

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} >
                <LoginInfo />
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} className={classes.paper} elevation={6} square>
                <form className={classes.form}>
                    <ErrorAlert error={error}/>
                    <TextField
                        error={error["email"]}
                        className={classes.input}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correu Electrònic"
                        name="email"
                        autoComplete="email"
                        onChange={(e) => handleChange(e)}
                        autoFocus />
                    <TextField
                        error={error["password"]}
                        className={classes.input}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contrasenya"
                        type="password"
                        id="password"
                        onChange={(e) => handleChange(e)}
                        autoComplete="current-password" />

                    <div className={classes.button}>
                        <PrimaryButton onClick={() => handleLogin()}> Entra </ PrimaryButton>
                    </div>
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
            </Grid>
        </ Grid>
    )
}