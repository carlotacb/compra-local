import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '0',
        padding: theme.spacing(3),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
}));


function SpanAlert(props){
    const classes = useStyles();
    const theme = useTheme();

    var msgColor = 'inherit';
    if(props.message === 'error') {
        msgColor = theme.palette.error.light;
    }
    else if(props.message === 'warning') {
        msgColor = theme.palette.warning.light;
    }
    else if(props.message === 'success') {
        msgColor = theme.palette.success.light;
    }
    return (
        <div className={classes.root} style={{backgroundColor: msgColor}}>
            {props.children}
        </div>
    )
}

export default SpanAlert; 