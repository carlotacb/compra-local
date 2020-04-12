import React from "react";
import { UserContext } from '../../context/';
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";
import { PrimaryButton, GroupButton } from "../../shared-components";
import { ListView,StoreProfile } from "../../components";

const useStyles = makeStyles((theme) => ({
    noStore: {
        marginTop: theme.spacing(10),
        '& > div':{
            marginTop: theme.spacing(2)
        }
    },
    header: {
        height: 'fit-content',
        marginBottom: theme.spacing(2)
    }
}));


export function Profile() {
    const classes = useStyles();
    const { user, setUser } = React.useContext(UserContext);
    const [edit, setEdit] = React.useState(false);
    const [step, setStep] = React.useState(0);


    function handleClick() {
        if (step == 0) {
            setStep(1)
        }
        else {
            setStep(0)
        }
    }


    function handleStoreRegistration() {
        setEdit(true);
    }

    // Loading until user variable has the information
    if (user === undefined) {
        return <p> Loading ...</p>;
    }



    function renderToRegistration() {
        return (
            <Grid container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.noStore}
            >
                <Grid item
                >
                    <Typography variant="h6">
                        No tens cap botiga registrada.
                   </Typography>
                </Grid>
                <Grid item
                >
                    <PrimaryButton
                        onClick={() => handleStoreRegistration()}
                    >
                        REGISTRAR BOTIGA
                    </PrimaryButton>
                </Grid>
            </Grid>
        )
    }


    function renderPage() {
        if(step == 0){
            return <StoreProfile edit={edit} />
        }
        else {
            return <p> products</p>
        }
    }

    return (
        <Grid container
            className={classes.root}
            alignItems="flex-start"
        >
            <Grid item xs={12}
                    className={classes.header}
            >
                {
                    (user["local_id"] != null) ?
                    <GroupButton
                    active={step}
                    onClick={() => handleClick()}
                    buttons={["Informació sobre l'establiment", "Productes disponibles"]}
                    /> :
                    <GroupButton
                    active={step}
                    onClick={() => handleClick()}
                    buttons={["Informació sobre l'establiment"]}
                    />
                }
            </Grid>
            <Grid item xs={12}>
                {
                    (user["local_id"] == null && edit == false) ?
                    renderToRegistration() :
                    renderPage()
                }
            </Grid>
        </Grid>
    )
}