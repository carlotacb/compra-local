import React from 'react';
import { Grid, Button, useTheme, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        margin: theme.spacing(1)
    },
}));


export function GroupButton(props) {
    const classes = useStyles();
    function handleClick(e) {
        const page = e.currentTarget.id;
        if(props.onClick){
            props.onClick(parseInt(page))
        }
    }

    const theme = useTheme();
    const active = props.active;
    const basicStyle= {
        borderRadius: 0,
        borderBottom: `3px solid transparent`
    }

    const elements = props.buttons;
    var styles = [];
    for(var i in elements) {
        styles.push(basicStyle);
    }    
    styles[active] = {
        borderRadius: 0,
        borderBottom: `3px solid ${theme.palette.primary.main}`
    }

    var buttons = [];
    for(var i in elements) {
        buttons.push(
            <Button 
            id={i} 
            onClick={(e) => handleClick(e)}
            style
            style={styles[i]}
        >
            {elements[i]}
        </Button>
        )
    }


    return (
        <div className={classes.root}>
            {buttons}
        </div>
    )


}