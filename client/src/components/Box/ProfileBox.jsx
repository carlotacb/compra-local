import React, { useState, useContext } from 'react';
import { Grid, makeStyles, Typography, TextField, Avatar, IconButton } from '@material-ui/core';
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
        backgroundColor: theme.palette.secondary.light
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

        const newUser = {
            data,
            ...user
        }
        console.log(data);
        setUser(newUser);
        console.log(user);
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
        <Grid container className={classes.root} direction="row"> 
            <Grid item xs={5} className={classes.content}> 
                <Typography variant="h5"> Nom i congnoms </Typography>
                {editable ? 
                    <TextField error={error} id="standard-basic" defaultValue={user.name} onChange={(e) => setNewName(e.target.value)}/> : 
                    <Typography> {user.name} </Typography> 
                }
                <Typography variant="h5" className={classes.paddingTop}> Correu electrónic </Typography>
                {editable ? 
                    <TextField error={error} id="standard-basic" defaultValue={user.email_address} onChange={(e) => setNewEmail(e.target.value)}/> : 
                    <Typography> {user.email_address} </Typography> 
                }
                <Typography variant="h5" className={classes.paddingTop}> Numero de telefon </Typography>
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
            <ConfirmationDialog open={openModal} cancel={() => handleCancel()} accept={() => handleAccept()} title={'Cancelar canvis'} message={'Estas segur de que vols cancelar els canvis? Si canceles els canvis es perdran'}/>
        </Grid>
    )
}