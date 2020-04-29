import React from 'react';
import { Grid, Paper, Typography, makeStyles, Avatar } from '@material-ui/core';
import { Stars } from '../../shared-components'
import { Tag } from '../../shared-components/Tag/Tag';
import { useHistory, useRouteMatch } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(2)
    },
    button: {
        cursor: 'pointer'
    },
    local: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(1)
    },
    avatar: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: theme.spacing(1)
        },
    },
    tags: {
        justifyContent: 'flex-end',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        '& div': {
            margin: theme.spacing(0.5)
        }
    },
    subtitle: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 0,
        textTransform: 'uppercase'
    },
    avatarSize: {
        width: '8em',
        height: '5em',
        objectFit: 'cover'
    },
}));

export function StoreCard(props) {
    const history = useHistory();
    const match = useRouteMatch();
    const classes = useStyles();


    function handleClick(e) {
        const id = parseInt(e.currentTarget.id);
        // Redirect to store page
        history.push(`${match.path}${id}`);
    }



    return (
        <Paper className={classes.root} square>
            <a onClick={(e) => handleClick(e)} id={props.id} className={classes.button}>
            <Grid container direction="row">
                <Grid item lg={2} md={4} sm={5} xs={12} className={classes.avatar}>
                    <Avatar 
                        variant="square" 
                        className={classes.avatarSize} 
                        src={'data:image/png;base64,'+ props.image}
                    />
                </Grid>
                <Grid item md={6}  sm={12} className={classes.local}>
                    <Typography variant="h6">
                        <b>{props.name}</b>
                    </Typography>
                    <div className={classes.subtitle}>
                        <Typography variant="subtitle2">
                            {props.category}
                        </Typography>
                    </div>
                    <div className={classes.rate}>
                        <Stars value={props.stars} />
                    </div>
                    <Typography variant="body1">
                        {props.description}
                    </Typography>
                </Grid>
                <Grid item lg={4} sm={12} className={classes.tags}>
                     {
                         props.tags.map(item=>
                            <Tag>
                                <Typography variant="subtitle2">
                                    {item}
                                </Typography>
                            </Tag>
                        )
                     }
                </Grid>
            </Grid>
            </a>
        </Paper>
    )
}