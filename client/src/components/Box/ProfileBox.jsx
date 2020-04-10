import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

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
        <Grid container className={classes.root}  alignItems="center"  justify="space-between" wrap="nowrap"> 
            <Grid item> 
                <Typography variant="h5"> Nom i congnoms </Typography>
                <Typography variant="body"> {props.name} </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h5"> Correu electrònic </Typography>
                <Typography variant="body"> {props.email} </Typography>
            </Grid>
        </Grid>
    )
}