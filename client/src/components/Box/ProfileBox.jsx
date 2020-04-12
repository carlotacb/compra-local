import React, { useState } from 'react';
import { Grid, makeStyles, Typography, TextField, Avatar } from '@material-ui/core';
import { ConfirmationDialog } from '../../components';
import { ApiFactory } from "../../services/ApiFactory";
import { useCookies } from 'react-cookie';

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
    const [ cookies ] = useCookies(['uisha']);
    const [ editable, setEditable ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ openModal, setOpenModal ] = useState(false);

    const handleSave = () => {
        const updateUserInfoAPI = ApiFactory.get('updateUserInfo');

        updateUserInfoAPI(cookies.iusha).then((res) => {
            if (!res.error) {
                setEditable(false);
                setError(false);
            } 
            else {
                setError(true);
            }
        });     
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
                {editable ? <TextField error={error} id="standard-basic" defaultValue={props.name} /> : <Typography> {props.name} </Typography> }
                <Typography variant="h5" className={classes.paddingTop}> Correu electrónic </Typography>
                {editable ? <TextField error={error} id="standard-basic" defaultValue={props.email} /> : <Typography> {props.email} </Typography> }
                <Typography variant="h5" className={classes.paddingTop}> Numero de telefon </Typography>
                {editable ? <TextField error={error} id="standard-basic" defaultValue={props.phone_number} type="number"/> : <Typography> {props.phone_number} </Typography> }
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
                    <EditIcon onClick={() => setEditable(true)} cursor="pointer"/> 
                }
            </Grid>
            <ConfirmationDialog open={openModal} cancel={() => handleCancel()} accept={() => handleAccept()} title={'Cancelar canvis'} message={'Estas segur de que vols cancelar els canvis? Si canceles els canvis es perdran'}/>
        </Grid>
    )
}