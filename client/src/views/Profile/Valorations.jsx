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
                    <ReviewCard writer={response[i].writer} punctuation={response[i].punctuation} comment={response[i].comment} />
                </Grid>
            )
        }
        return (valorations)
    }

    return (
        <ListView maxHeight={100}>
            {renderValorations()}
        </ListView>
    )
}