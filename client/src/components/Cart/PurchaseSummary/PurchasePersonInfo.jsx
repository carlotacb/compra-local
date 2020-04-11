import React from 'react';
import { UserContext } from '../../../context/';
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

export function PurchasePersonInfo() {
    const {user, setUser} = React.useContext(UserContext)
    const classes = useStyles();
    return (
        <Grid container direction="column" className = {classes.root}>
            <Grid item>
                <Typography variant="body1">
                    Si us plau, verifica les teves dades abans de confirmar.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1">
                    <b>Nom:</b> {user["name"]}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1">
                    <b>Número de telèfon:</b> {user["name"]}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1">
                    <b>Direcció:</b> Falta ponerla
                </Typography>
            </Grid>
        </Grid>
    );
}