import React from "react";
import { ReviewCard, ListView } from "../../components/";

import { Grid, Typography } from "@material-ui/core";
import { NoInfoCard } from "../../components/Card/NoInfoCard";

export function Valorations(props) {

    const renderValorations = () => {
        const response = props.response;
        var valorations = [];
        for (var i = 0; i < response.length; ++i) {
            valorations.push(
                <Grid item>
                    <ReviewCard writer={response[i].writer || response[i].destination} punctuation={response[i].punctuation} comment={response[i].comment} />
                </Grid>
            )
        }

        if (valorations.length === 0) {
            if (props.rebudes) valorations.push(<NoInfoCard information={"Encara no has rebut cap valoració"}/>)
            else valorations.push(<NoInfoCard information={"Encara no has realitzat cap valoració"}/>)
        }

        return (valorations)
    }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                {renderValorations()}
            </Grid>
        </Grid>
    )
}