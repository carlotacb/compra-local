import React, { useState } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { SecondaryButton, GroupButton } from '../../shared-components/';
import { PasswordDialog } from "../../components";
import { ApiFactory } from "../../services/ApiFactory";
import { Valorations } from "./Valorations"
import { UserContext } from '../../context/UserContext';
import { Loading } from "../../components/Loading/Loading";
import { UserInformationRouter } from "../../components/UserProfile/UserInformationRouter";

const useStyles = makeStyles((theme) => ({
    secondTitle: {
        paddingTop: theme.spacing(4),
    }
}));

export function Profile() {
    const classes = useStyles();
    const { user } = React.useContext(UserContext);
    const [ page, setPage ] = useState(0);
    const [ recivedValorations, setRecivedValorations ] = useState('');
    const [ givenValorations, setGivenValorations ] = useState('');
    const [ load, setLoad] = useState(false);
    const [ openModal, setOpenModal ] = useState(false);
    

    const handleChangePassword = (close) =>{
        if (close) {
            setOpenModal(false);
        }
    }

    React.useEffect(function getRecivedValorations() {
        if(user === undefined) return;
        
        const getRecivedValorationsAPI = ApiFactory.get('getRecivedValorations');
        const getGivenValorationsAPI = ApiFactory.get('getGivenValorations');
        getRecivedValorationsAPI(user["id"]).then((res1) => {
            getGivenValorationsAPI(user["id"]).then((res2) => {
                setRecivedValorations(res1.reviews_list);
                setGivenValorations(res2.done_reviews);
            });
        });
    }, [user]);

    if(user === undefined) {
        return <Loading />
    }

    return (
        <Grid container direction="column" justify="space-between"
        >
            <Grid item >
                <UserInformationRouter />
            </Grid>

            <Grid item className={classes.secondTitle}> 
                <Typography variant="h2"> Les teves valoracions </Typography>
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

