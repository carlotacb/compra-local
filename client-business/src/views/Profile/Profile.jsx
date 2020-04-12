import React from "react";
import { UserContext } from '../../context/';
import { Grid, Paper } from "@material-ui/core";
import { PrimaryButton, GroupButton } from "../../shared-components";
import {ListView } from "../../components";
export function Profile() {

    const {user, setUser} = React.useContext(UserContext);
    const [edit, setEdit]  = React.useState(false);
    const [step, setStep ] = React.useState(0);

    var output;
    if (user["local_id"] == undefined) {
        output = (
            <Grid container>
                <Grid item>
                    No tens cap botiga registrada.
                </Grid>
                <Grid item>
                    <PrimaryButton>
                        REGISTRAR BOTIGA
                    </PrimaryButton>
                </Grid>
            </Grid> 
        )
    }
    else if (edit == true){
        output = (
            <Paper>
                HOLA
            </Paper>
        )
    }
    else {
        output = (
            <ListView>
                d
            </ListView>
        )
    }

    return (
        <Grid container
            direction="column"
        >
            <Grid item xs={12}>
                <GroupButton 
                    active = {0}
                    onClick = {() => {setStep(!step)}}
                    buttons = {["Informació sobre l'establiment", "Productes disponibles"]}
                />
            </Grid>
            <Grid item>
                {output}
            </Grid>
        </Grid>
    )
}