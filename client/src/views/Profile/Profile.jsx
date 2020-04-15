import React, { useState } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { SecondaryButton, GroupButton } from '../../shared-components/';
import { ProfileBox, PasswordDialog } from "../../components";
import { ApiFactory } from "../../services/ApiFactory";
import { Valorations } from "./Valorations"
import { UserContext } from '../../context/UserContext';
import { Loading } from "../../components/Loading/Loading";
import { UserInformation, UserInformationEdit } from "../../components/";

const useStyles = makeStyles((theme) => ({
    secondTitle: {
        paddingTop: theme.spacing(4),
    }
}));

export function Profile() {
    const { user } = React.useContext(UserContext);
    const [ edit, setEdit ] = React.useState(false);
    const [ page, setPage ] = useState(0);
    const [ recivedValorations, setRecivedValorations ] = useState('');
    const [ givenValorations, setGivenValorations ] = useState('');
    const [ openModal, setOpenModal ] = useState(false);
    const classes = useStyles();

    const handleChangePassword = (close) =>{
        if (close) {
            setOpenModal(false);
        }
    }

    React.useEffect(function getRecivedValorations() {
        if(user === undefined) return;

        const getRecivedValorationsAPI = ApiFactory.get('getRecivedValorations');
        getRecivedValorationsAPI(user["id"]).then((res) => {
            setRecivedValorations(res.reviews_list);
        });

        const getGivenValorationsAPI = ApiFactory.get('getGivenValorations');
        getGivenValorationsAPI(user["id"]).then((res) => {
            setGivenValorations(res.done_reviews);
        });

    }, [user]);

    if(user === undefined) {
        return <Loading />
    }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                {
                    edit ?
                    <UserInformationEdit /> :
                    <UserInformation />
                }
            </Grid>

            <Grid item className={classes.secondTitle}> 
                <Typography variant="h1"> Les teves valoracions </Typography>
            </Grid>
            <Grid item>
                <GroupButton buttons={["Rebudes", "Realitzades"]} active={page} onClick={(p) => setPage(p)} />
                {(page === 0) ? 
                <Valorations response={recivedValorations} rebudes={true} /> : 
                <Valorations response={givenValorations} rebudes={false} />}
            </Grid>
            <PasswordDialog title={'Canviar la contrasenya'} onAccept={(op, np) => handleChangePassword(op, np)} open={openModal} onClose={() => setOpenModal(false)}/>
        </Grid>
    )
}

