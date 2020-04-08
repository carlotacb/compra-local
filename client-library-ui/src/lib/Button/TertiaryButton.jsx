import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: '0',
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
}));


function TertiaryButton(props) {
    const classes = useStyles();
    return (
        <Button className={classes.root} variant="outlined" color="primary">
            {props.children}
        </Button>
    )
}

export default TertiaryButton;