import React, { useState } from 'react';
import { Grid, makeStyles, Typography, TextField } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        backgroundColor: theme.palette.secondary.light
    },
    editButton: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    content: {
        padding: theme.spacing(2),
    }
}));

export function ProfileBox(props) {
    const classes = useStyles();
    const [editable, setEditable] = useState(false);

    const handleEdit = () => {
        console.log('clicked');
        setEditable(!editable);
    }

    return (
        <Grid container className={classes.root} direction="column"> 
            <Grid item className={classes.editButton}>
                <EditIcon onClick={() => handleEdit()} cursor="pointer"/>
            </Grid>
            <Grid item className={classes.content}> 
                <Typography variant="h5"> Nom i congnoms </Typography>
                {editable ? <TextField id="standard-basic" defaultValue={props.name} /> : <Typography> {props.name} </Typography> }
            </Grid>
            <Grid item className={classes.content}>
                <Typography variant="h5"> Correu electrònic </Typography>
                {editable ? <TextField id="standard-basic" defaultValue={props.email} /> : <Typography> {props.email} </Typography> }
            </Grid>
        </Grid>
    )
}