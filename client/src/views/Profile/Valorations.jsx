import React from "react";
import { ReviewCard, ListView } from "../../components/";

import { Grid, Typography } from "@material-ui/core";

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
            if (props.rebudes) valorations.push(<Typography variant="h6"> Encara no has rebut cap valoració </Typography>)
            else valorations.push(<Typography variant="h6"> Encara no has realitzat cap valoració </Typography>)
        }

        return (valorations)
    }

    return (
        <ListView maxHeight={100}>
            {renderValorations()}
        </ListView>
    )
}