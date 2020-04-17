import React from 'react';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { Stars, Tag } from '../../shared-components'


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[50],
    },
    container: {
        width: '100%',
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(1)
    },
    tag: {
        float: 'right'
    },
    inline: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    }
}));

export function ReviewCard(props) {
    const classes = useStyles();

    var tagName;
    switch (props.type) {
        case "shop":
            tagName = "BOTIGA";
            break;
        case "volunteer":
            tagName = "VOLUNTARI";
            break;
        default:
            tagName = undefined;
    }

    return (
        <Paper className={classes.root} square>
            <Grid container direction="row" justify="space-between">
                <Grid item xs={6}>
                    <Stars value={props.punctuation} />
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.tag}>
                        {
                            tagName &&
                            <Tag>
                                <Typography variant="body2">
                                    {tagName}
                                </Typography>
                            </Tag>
                        }
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        {props.writer}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        {props.comment}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}