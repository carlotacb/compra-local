import React, { useContext, useState } from "react";
import { useParams } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { SecondaryButton, GroupButton } from '../../shared-components/';
import { ProfileBox, PasswordDialog } from "../../components";
import { ApiFactory } from "../../services/ApiFactory";

import { Valorations } from "./Valorations"

import mock from './mock.json'
import mock2 from './mock2.json'

const useStyles = makeStyles((theme) => ({
    secondTitle: {
        paddingTop: theme.spacing(4),
    }
}));

export function Profile() {
    const { id } = useParams();
    const [ page, setPage ] = useState(0);
    const [ valorations, setValorations ] = useState(mock);
    const [ recivedValorations, setRecivedValorations ] = useState('');
    const [ openModal, setOpenModal ] = useState(false);
    const classes = useStyles();

    const changePage = (p) => {
        setPage(p)
        if (p === 0) setValorations(recivedValorations);
        else setValorations(mock2);
    }

    const handleChangePassword = (oldPassword, newPassword) =>{
        console.log(oldPassword + " - " + newPassword);
        setOpenModal(false);
    }

    React.useEffect(function getRecivedValorations() {
        const getRecivedValorationsAPI = ApiFactory.get('getRecivedValorations');
        getRecivedValorationsAPI(id).then((res) => {
            setRecivedValorations(res);
        });
    }, []);

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                <Typography variant="h1">
                    Hola !
                </Typography>
            </Grid>
            <Grid item>
                <ProfileBox name="Carlota" email="carlota@hackupc.com"/>
            </Grid>
            <Grid item>
                <SecondaryButton onClick={() => setOpenModal(true)}> Canviar contrasenya </SecondaryButton>
            </Grid>
            <Grid item className={classes.secondTitle}> 
                <Typography variant="h1"> Les teves valoracions </Typography>
            </Grid>
            <Grid item>
                <GroupButton buttons={["Rebudes", "Realitzades"]} active={page} onClick={(p) => changePage(p)} />
                <Valorations response={valorations}/>
            </Grid>
            <PasswordDialog title={'Canviar el password'} onAccept={(op, np) => handleChangePassword(op, np)} open={openModal} onClose={() => setOpenModal(false)}/>
        </Grid>
    )
}

