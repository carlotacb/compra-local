import React from 'react';
import { TextField, Grid, makeStyles, Typography } from '@material-ui/core';
import { PrimaryButton } from '../../shared-components/Button/PrimaryButton';




const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '30em',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.secondary.light
    },
    containerInput: {
        width: 'auto',
        flex:1,
        marginRight: theme.spacing(1)
    },
    input : {
        fontSize: '10px',
        '& > div': {
            borderRadius: '0',
            backgroundColor: 'white'
        }
    },
    button: {
        width: 'fit-content'
    },
    text: {
        fontSize: '20x',
        padding:  theme.spacing(1.2)
    },
    label: {
        fontSize: '15px',
        padding: '0',
        marginTop: '-0.5em'
    }
}));

export function SearchBox(props) {

    const classes = useStyles();

    return (
        <Grid container 
            className={classes.root} 
            alignItems="center" 
            justify="space-between"
        >
            <Grid
                item
                className={classes.containerInput}
            >
                <TextField
                    fullWidth 
                    className = {classes.input}
                    label = {props.label}
                    variant = "outlined"
                    InputProps={{
                        classes: {
                            input: classes.text
                        }
                      }}
                    InputLabelProps={{
                        classes: {
                            root: classes.label
                        }
                    }}                    
                />
            </Grid>
            <Grid item className={classes.button}>
                <PrimaryButton>
                    <Typography variant="body1">CERCAR</Typography>
                </PrimaryButton>
            </Grid>
        </Grid>
    )
}