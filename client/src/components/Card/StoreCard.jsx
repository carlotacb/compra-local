import React from 'react';
import { Grid, Paper, Typography, makeStyles, Avatar } from '@material-ui/core';
import { Stars } from '../../shared-components'
import { Tag } from '../../shared-components/Tag/Tag';
import { useHistory, useRouteMatch } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        backgroundColor: '#F9F9F9'

    },
    button: {
        cursor: 'pointer'
    },
    local: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(1)
    },
    tags: {
        display: 'flex',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
        height: '100%',
        justifyContent: 'flex-end',
        '& > div': {
            margin: theme.spacing(0.5)
        }
    },
    subtitle: {
        display: 'flex',
        flexDirection: 'row',
        '& > *': {
            paddingRight: theme.spacing(1)
        }
    },
    avatarSize: {
        width: '90%',
        height: '90%'
    }
}));

export function StoreCard(props) {
    const history = useHistory();
    const match = useRouteMatch();
    const classes = useStyles();


    function handleClick(e) {
        const id = parseInt(e.currentTarget.id);
        // Redirect to restaurant
        history.push(`${match.path}${id}`);
    }

    function renderTags(tags) {
        var output = [];
        for (var i in tags) {
            output.push(
                <Tag>
                    <Typography variant="subtitle2">
                        {tags[i]}
                    </Typography>
                </Tag>
            )
        }
        return output;
    }

    return (
        <Paper className={classes.root}>
            <a onClick={(e) => handleClick(e)} id={props.id} className={classes.button}>
            <Grid container direction="row">
                <Grid item xs={2}>
                    <Avatar variant="rounded" className={classes.avatarSize} />
                </Grid>
                <Grid item xs={7} className={classes.local}>
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
            </a>
        </Paper>
    )
}