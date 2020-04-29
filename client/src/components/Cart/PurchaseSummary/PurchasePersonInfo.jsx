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
                    <b>Nom:</b> {user["name"]}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1">
                    <b>Número de telèfon:</b> {user["phone_number"]}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1">
                    <b>Direcció:</b> {user["postal_address"]}
                </Typography>
            </Grid>
        </Grid>
    );
}