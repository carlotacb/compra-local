import React from 'react';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { PrimaryButton, Stars } from '../../shared-components'


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(2)
    },
    local: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(1)
    },
    tags: {
        alignContent: 'end'
    },
    subtitle: {
        display: 'flex',
        flexDirection: 'row',
        '& > *': {
            paddingRight: theme.spacing(1)
        }
    }
}));

export function RestaurantCard(props) {
    const classes = useStyles();

    function renderTags(tags) {
        var output = [];
        for (var i in tags) {
            output.push(
                <PrimaryButton>
                    <Typography variant="body2">
                        {tags[i]}
                    </Typography>
                </PrimaryButton>
            )
        }
        return output;
    }

    return (
        <Paper className={classes.root}>
            <Grid container direction="row">
                <Grid item xs={3}>
                    IMG
                </Grid>
                <Grid item xs={6} className={classes.local}>
                    <Typography variant="h5">
                        {props.name}
                    </Typography>
                    <div className={classes.subtitle}>
                        <Typography variant="subtitle">
                            {props.category}
                        </Typography>
                        <div>
                            <Stars value={props.stars} />
                        </div>
                    </div>
                    <Typography variant="body1">
                        {props.description}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.tags}>
                        {renderTags(props.tags)}
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}