import React, { useState } from 'react';
import { Grid, makeStyles, Typography, TextField } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

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
        /* Here is not API call */
        setEditable(true);
    }

    const handleSave = () => {
        /* TODO: API call to save the new information */ 
        setEditable(false);
    }

    const handleCancel = () => {
        /* TODO: Maybe add a are you sure modal message */ 
        setEditable(false);
    }

    return (
        <Grid container className={classes.root} direction="column"> 
            <Grid item className={classes.editButton}>
                {editable ? 
                    <div>
                        <SaveIcon onClick={() => handleSave()} cursor="pointer" />
                        <CloseIcon onClick={() => handleCancel()} cursor="pointer" />
                    </div> : 
                    <EditIcon onClick={() => handleEdit()} cursor="pointer"/> 
                }
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