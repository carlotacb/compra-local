import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { ListCart } from './ListCart';
import { PrimaryButton } from '../../../shared-components';
import {HeaderCart } from './HeaderCart';

const useStyles = makeStyles((theme) => ({
    buttonComprar: {
        marginTop: theme.spacing(4)
    }
}));

export function ContentCart() {
    const classes = useStyles();
    return(
        <div>
            <HeaderCart />
            <ListCart />
            <Grid container justify="center" className={classes.buttonComprar}>
                <Grid item>
                    <PrimaryButton>
                        COMPRAR
                    </PrimaryButton>
                </Grid>
            </Grid>
        </div>
    )
}