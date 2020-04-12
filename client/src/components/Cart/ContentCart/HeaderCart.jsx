import React from 'react';
import { Typography, makeStyles, Grid, IconButton, useTheme } from '@material-ui/core';

export function HeaderCart() {

    const elements = [
        "Quantitat",
        "Preu / unitat",
        "Preu total"
    ];

    var output = []
    for(var i in elements) {
        output.push(
            <Grid item>
                <Typography variant="subtitle1">
                    <b>{elements[i]}</b>
                </Typography>
            </Grid>
        )
    }

    return (
        <Grid container
            justify="space-between"
        >
            <Grid item xs={5}>
                <Typography variant="subtitle1">
                    <b>Producte</b>
                </Typography>
            </Grid>
            {output}
        </Grid>
    )
}