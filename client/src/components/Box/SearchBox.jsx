import React from 'react';
import { TextField, Grid, makeStyles, Typography } from '@material-ui/core';
import { PrimaryButton } from '../../shared-components/Button/PrimaryButton';




const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 'fit-content',
        minWidth: '30em',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.secondary.light
    },
    input : {
        fontSize: '25ch',
        '& > div': {
            borderRadius: '0',
            backgroundColor: 'white'
        }
    }
}));

export function SearchBox(props) {

    const classes = useStyles();
    return (
        <Grid container 
            className={classes.root} 
            alignItems="center" 
            justify="space-between"
            wrap="nowrap">
            <Grid
                item
                xs ={8}
            >
                <TextField
                    fullWidth 
                    className = {classes.input}
                    label = {props.label}
                    variant = "outlined"
                />
            </Grid>
            <Grid item>
                <PrimaryButton>
                    <Typography variant="h5">CERCAR</Typography>
                </PrimaryButton>
            </Grid>
        </Grid>
    )
}