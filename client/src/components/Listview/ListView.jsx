import React from 'react';
import { makeStyles, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    container: {

    },
    root: {
        padding: theme.spacing(4),
        overflowY: 'auto',
        overflowX: 'unset',
        flexWrap: 'inherit'
    },
}));

export function ListView(props) {
    const classes = useStyles();

    return (    
            <Grid
                container
                direction="column"
                className={classes.root}
                style={{ 
                    maxHeight: props.maxHeight + 'em',
                    backgroundColor: props.background
                }}
            >
                {props.children}
            </Grid>
    )
}