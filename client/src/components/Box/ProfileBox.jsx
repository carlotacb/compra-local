import React, { useState, useContext } from 'react';
import { Grid, makeStyles, Typography, TextField, Avatar, IconButton, Paper } from '@material-ui/core';
import { ConfirmationDialog } from '../../components';

import { UserContext } from '../../context/UserContext';
import { ApiFactory } from "../../services/ApiFactory";

import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        backgroundColor: "#F9F9F9"
    },
    editButton: {
        display: 'flex',
	    flexDirection: 'column',
	    flexWrap: 'wrap',
	    justifyContent: 'flex-start',
	    alignItems: 'flex-end',
	    alignContent: 'flex-end'
    },
    avatar: {
        display: 'flex',
	    flexDirection: 'column',
	    flexWrap: 'wrap',
	    justifyContent: 'center',
	    alignItems: 'center',
	    alignContent: 'center'
    },
    avatarSize: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        marginBottom: theme.spacing(2)
    },
    content: {
        paddingLeft: theme.spacing(2),
    },
    paddingTop: {
        paddingTop: theme.spacing(2),
        fontWeight: 'bold'
    },
    bold: {
        fontWeight: 'bold'
    }
}));

export function ProfileBox() {
    const classes = useStyles();
    const { user, setUser } = useContext(UserContext) 
    const [ error, setError ] = useState(false);
    const [ editable, setEditable ] = useState(false);
    const [ newName, setNewName ] = useState(user.name);
    const [ newEmail, setNewEmail ] = useState(user.email_address);
    const [ newPhone, setNewPhone ] = useState(user.phone_number);
    const [ openModal, setOpenModal ] = useState(false);

    const handleSave = () => {
        const updateUserInfoAPI = ApiFactory.get('updateUserInfo');
        const data = {
            "email_address": newEmail,
            "image": user.image,
            "name": newName,
            "phone_number": newPhone,
            "postal_address": user.postal_address
        }

        var newUser = user;
        newUser["email_address"] = newEmail;
        newUser["name"] = newName;
        newUser["phone_number"] = newPhone;
        
        setUser(newUser);
        updateUserInfoAPI(user["id"], data).then((res) => {
            if (!res.error) {            
                setEditable(false);
                setError(false);
            } 
            else {
                setError(true);
            }
        });     
    }

    const handleEdit = () => {
        console.log(user)
        setEditable(true);
    } 

    const handleAccept = () => {
        setOpenModal(false);
        setEditable(false);
    }

    const handleCancel = () => {
        setError(false);
        setOpenModal(false);
    }

    return (
        <Paper className={classes.root}>
            <Grid container direction="row"> 
                <Grid item xs={5} className={classes.content}> 
                    <Typography variant="h6" className={classes.bold}> Nom i cognoms </Typography>
                    {editable ? 
                        <TextField error={error} id="standard-basic" defaultValue={user.name} onChange={(e) => setNewName(e.target.value)}/> : 
                        <Typography> {user.name} </Typography> 
                    }
                    <Typography variant="h6" className={classes.paddingTop}> Correu electrónic </Typography>
                    {editable ? 
                        <TextField error={error} id="standard-basic" defaultValue={user.email_address} onChange={(e) => setNewEmail(e.target.value)}/> : 
                        <Typography> {user.email_address} </Typography> 
                    }
                    <Typography variant="h6" className={classes.paddingTop}> Número de telèfon </Typography>
                    {editable ? 
                        <TextField error={error} id="standard-basic" defaultValue={user.phone_number} type="number" onChange={(e) => setNewPhone(e.target.value)}/> : 
                        <Typography> {user.phone_number} </Typography> 
                    }
                </Grid>
                <Grid xs={5} className={classes.avatar}>
                    {editable ?
                        <Avatar className={classes.avatarSize} src={'data:image/png;base64,'+ user.image}/> : 
                        <Avatar className={classes.avatarSize} src={'data:image/png;base64,'+ user.image}>  
                            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                                </IconButton>
                            </label>
                        </Avatar>}
                    <Typography> {user.postal_address} </Typography>
                </Grid>
                <Grid item xs={2} className={classes.editButton}>
                    {editable ? 
                        <div>
                            <SaveIcon onClick={() => handleSave()} cursor="pointer" />
                            <CloseIcon onClick={() => setOpenModal(true)} cursor="pointer" />
                        </div> : 
                        <EditIcon onClick={() => handleEdit()} cursor="pointer"/> 
                    }
                </Grid>
                <ConfirmationDialog open={openModal} cancel={() => handleCancel()} accept={() => handleAccept()} title={'Cancel·lar canvis'} message={'Estàs segur de què vols cancel·lar els canvis? Si cancel·les, els canvis es perdran'}/>
            </Grid>
        </Paper>
    )
}