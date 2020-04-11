import React from "react";
import { Grid } from "@material-ui/core";
import { HelpingProcessCard } from '../../components';

export function ProcessPickUp() {

    const getAllCurrentOrders = () => {
        return <HelpingProcessCard />
    }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                {getAllCurrentOrders()}
            </Grid>
        </Grid>
    )
}