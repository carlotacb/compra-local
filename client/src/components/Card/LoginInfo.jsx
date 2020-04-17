import React from 'react';
import { Typography, makeStyles, Grid } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(5),
        backgroundColor: 'white',
        maxWidth: '25em',
        height: 'fit-content',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
    },
    h5: {
        marginBottom: theme.spacing(2)
    }
}));

export function LoginInfo() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container
                alignContent="center"
            >
                <Grid item xs={8}>
                    <Typography
                        className={classes.h5}
                        variant="h5"
                        color="primary">
                        USUARIS DE PROVA
                        </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <b>Usuari 1:</b>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1">
                        <i>Usuari:</i> hi@albert.dev
                        </Typography>
                    <Typography variant="body1">
                        <i>Contrasenya:</i> albert
                        </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <b>Usuari 2:</b>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1">
                        <i>Usuari:</i> hi@andreu.dev
                        </Typography>
                    <Typography variant="body1">
                        <i>Contrasenya:</i> andreu
                        </Typography>
                </Grid>
            </Grid>
        </div >
    )
}