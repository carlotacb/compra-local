import React from 'react';
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    span: {
        color: 'white',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        backgroundColor: theme.palette.error.light,
        marginBottom: theme.spacing(1),
        textAlign: 'center',
        border: `1px solid ${theme.palette.error.dark}`
    },
}));

export function ErrorAlert(props) {
    const classes = useStyles();
    var existsError = false;
    var errorsOutput = [];

    for (var i in props.error) {
        if (props.error[i] && props.error[i].length > 0 && !existsError) {
            existsError = true;
            errorsOutput.push(
                props.error[i]
            )
        }
    }

    if (!existsError) return [];
    return (
        <div className={classes.span}>
            <Typography variant="subtitle1">
                {errorsOutput}
            </Typography >
        </div >
    )
}