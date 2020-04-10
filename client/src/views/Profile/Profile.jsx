import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { SecondaryButton } from '../../shared-components/';
import { ProfileBox } from "../../components";

const useStyles = makeStyles((theme) => ({
    
}));

export function Profile() {
    const { user, setUser } = useContext(UserContext);
    const classes = useStyles();

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                <Typography variant="h1">
                    Hola {user}!
                </Typography>
            </Grid>
            <Grid item>
                <ProfileBox name="Carlota" email="carlota@hackupc.com"/>
            </Grid>
            <Grid item>
                <SecondaryButton> Canviar contrasenya </SecondaryButton>
            </Grid>

        </Grid>
    )
}

