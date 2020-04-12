import React from "react";
import { ReviewCard, ListView } from "../../components/";

import { Grid } from "@material-ui/core";

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
            if (props.rebudes) valorations.push(<h1> No has rebut cap valoració </h1>)
            else valorations.push(<h1> No has realitzat cap valoració </h1>)
        }

        return (valorations)
    }

    return (
        <ListView maxHeight={100}>
            {renderValorations()}
        </ListView>
    )
}