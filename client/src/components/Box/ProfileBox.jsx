import React, { useState, useContext } from 'react';
import { Grid, makeStyles, Typography, TextField, Avatar } from '@material-ui/core';
import { ConfirmationDialog } from '../../components';
import { ApiFactory } from "../../services/ApiFactory";
import { useCookies } from 'react-cookie';

import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { UserContext } from '../../context/UserContext';

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
    },
    content: {
        paddingLeft: theme.spacing(2),
    },
    paddingTop: {
        paddingTop: theme.spacing(2),
    }
}));

export function ProfileBox(props) {
    const classes = useStyles();
    const { user, setUser } = React.useContext(UserContext) 
    const [ error, setError ] = useState(false);
    const [ editable, setEditable ] = useState(false);
    const [ newName, setNewName ] = useState(props.name);
    const [ newEmail, setNewEmail ] = useState(props.email);
    const [ newPhone, setNewPhone ] = useState(props.phone_number);
    const [ openModal, setOpenModal ] = useState(false);

    const handleSave = () => {
        const updateUserInfoAPI = ApiFactory.get('updateUserInfo');

        const data = {
            "email_address": newEmail,
            "image": props.image,
            "name": newName,
            "phone_number": newPhone
        }

        console.log(data)

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
        if (newName === "") setNewName(props.name);
        if (newPhone === "") setNewPhone(props.phone_number);
        if (newEmail === "") setNewEmail(props.email);

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
                    <TextField error={error} id="standard-basic" defaultValue={user.email} onChange={(e) => setNewEmail(e.target.value)}/> : 
                    <Typography> {user.email} </Typography> 
                }
                <Typography variant="h5" className={classes.paddingTop}> Numero de telefon </Typography>
                {editable ? 
                    <TextField error={error} id="standard-basic" defaultValue={user.phone_number} type="number" onChange={(e) => setNewPhone(e.target.value)}/> : 
                    <Typography> {user.phone_number} </Typography> 
                }
            </Grid>
            <Grid xs={5} className={classes.avatar}>
                <Avatar className={classes.avatarSize} src={'data:image/png;base64,'+ props.image}/>
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