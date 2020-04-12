import React, { useState } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { SecondaryButton, GroupButton } from '../../shared-components/';
import { ProfileBox, PasswordDialog } from "../../components";
import { ApiFactory } from "../../services/ApiFactory";
import { useCookies } from 'react-cookie';
import { Valorations } from "./Valorations"

const useStyles = makeStyles((theme) => ({
    secondTitle: {
        paddingTop: theme.spacing(4),
    }
}));

export function Profile() {
    const [ cookies ] = useCookies(['uisha']);
    const [ page, setPage ] = useState(0);
    const [ recivedValorations, setRecivedValorations ] = useState('');
    const [ givenValorations, setGivenValorations ] = useState('');
    const [ userInformation, setUserInformation ] = useState('');
    const [ openModal, setOpenModal ] = useState(false);
    const classes = useStyles();

    const handleChangePassword = (oldPassword, newPassword) =>{
        console.log(oldPassword + " - " + newPassword);
        setOpenModal(false);
    }

    React.useEffect(function getRecivedValorations() {
        const getRecivedValorationsAPI = ApiFactory.get('getRecivedValorations');
        getRecivedValorationsAPI(cookies.iusha).then((res) => {
            setRecivedValorations(res.reviews_list);
        });
    }, []);

    React.useEffect(function getGivenValorations() {
        const getGivenValorationsAPI = ApiFactory.get('getGivenValorations');
        getGivenValorationsAPI(cookies.iusha).then((res) => {
            setGivenValorations(res);
        });
    }, []);

    React.useEffect(function getUserInformation() {
        const getUserInformationAPI = ApiFactory.get('getUserInformation');
        getUserInformationAPI(cookies.iusha).then((res) => {
            setUserInformation(res.user);
        });
    }, []);


    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                <Typography variant="h1">
                    Hola {userInformation.name}!
                </Typography>
            </Grid>
            <Grid item>
                <ProfileBox name={userInformation.name} email={userInformation.email_address} phone_number={userInformation.phone_number} image={userInformation.image}/>
            </Grid>
            <Grid item>
                <SecondaryButton onClick={() => setOpenModal(true)}> Canviar contrasenya </SecondaryButton>
            </Grid>
            <Grid item className={classes.secondTitle}> 
                <Typography variant="h1"> Les teves valoracions </Typography>
            </Grid>
            <Grid item>
                <GroupButton buttons={["Rebudes", "Realitzades"]} active={page} onClick={(p) => setPage(p)} />
                {(page === 0) ? 
                <Valorations response={recivedValorations}/> : 
                <Valorations response={givenValorations}/>}
            </Grid>
            <PasswordDialog title={'Canviar el password'} onAccept={(op, np) => handleChangePassword(op, np)} open={openModal} onClose={() => setOpenModal(false)}/>
        </Grid>
    )
}

