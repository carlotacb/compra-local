import React from "react";
import { Grid, Paper, makeStyles, Typography, Divider, IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { ListView } from '../ListView/ListView';
import { StoreContext } from '../../context';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[50],
        padding: theme.spacing(4)
    },
    item: {
        padding: theme.spacing(1),
    },
    divider: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2)
    },
    horariTitle: {
        textAlign: 'center',
        color: theme.palette.primary.main,
        marginTop: theme.spacing(2)
    },
    editButton: {
        display: 'flex',
        justifyContent: 'space-between',
        '& > h6': {
            color: theme.palette.primary.main
        }
    },
    textCenter: {
        textAlign: 'center'
    },
    horariContent:{
        margin: '0 auto',
        marginTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
}));

export function StoreInfo(props) {

    const classes = useStyles();

    const { store, setStore } = React.useContext(StoreContext)
    if (store["id"] == "") return (<p>Loading...</p>)


    function renderHorari() {

        var days = {
            "Dilluns": ["hmoni", "hmonf"],
            "Dimarts": ["htuei", "htuef"],
            "Dimecres": ["hwedi", "hwedf"],
            "Dijous": ["hthui", "hthuf"],
            "Divendres": ["hfrii", "hfrif"],
            "Dissabte": ["hsati", "hsatf"],
            "Diumenge": ["hsuni", "hsunf"]
        }
        var output = [];
        for (var i in days) {
            output.push(
                <Grid item xs={4}>
                    <Typography variant="subtitle1">
                        <b>{i}</b>
                    </Typography>
                </Grid>
            )
            if(store[days[i][0]]) {
                output.push(
                    <Grid item xs={4} className={classes.textCenter}>
                        <Typography>
                        {store[days[i][0]]}
                        </Typography>
                    </Grid>
                )
            }
            else {
                output.push(
                    <Grid item xs={4} className={classes.textCenter}>
                        <Typography>
                        -
                        </Typography>
                    </Grid>
                )
            }
            if(store[days[i][1]]) {
                output.push(
                    <Grid item xs={4} className={classes.textCenter}>
                        <Typography>
                        {store[days[i][1]]}
                        </Typography>
                    </Grid>
                )
            }
            else {
                output.push(
                    <Grid item xs={4} className={classes.textCenter}>
                        <Typography>
                        -
                        </Typography>
                    </Grid>
                )
            }
        }

        return (
            <Grid container
                direction="row"
            >
                <Grid item xs={4}>
                    <b>Dia</b>
                </Grid>
                <Grid item xs={4} className={classes.textCenter}>
                    <b>Hora Inici</b>
                </Grid>
                <Grid item xs={4} className={classes.textCenter}>
                    <b>Hora Final</b>
                </Grid>
                {output}
            </Grid>
        )
    }

    return (
        <Grid container direction="row"  className={classes.root}>
            <Grid item xs={12}>
                <div className={classes.editButton}>
                    <Typography variant="h6">
                        <b>Aquesta es la informació sobre la teva botiga:</b>
                    </Typography>
                    <IconButton onClick={() => props.onEdit()}>
                        <EditIcon />
                    </IconButton>
                </div>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    {store["name"] && <Grid item xs={6} className={classes.item}>
                        <Typography variant="body1">
                            <b>Nom de l'empresa</b>
                        </Typography>
                        <Typography variant="body1">
                            {store["name"]}
                        </Typography>
                    </Grid>}
                    {store["category"] && <Grid item xs={6} className={classes.item}>
                        <Typography variant="body1">
                            <b>Categoria</b>
                        </Typography>
                        <Typography variant="body1">
                            {store["category"]}
                        </Typography>
                    </Grid>}
                    {store["postal_address"] && <Grid item xs={6} className={classes.item}>
                        <Typography variant="body1">
                            <b>Adreça</b>
                        </Typography>
                        <Typography variant="body1">
                            {store["postal_address"]}
                        </Typography>
                    </Grid>}
                    {store["phone_number"] && <Grid item xs={6} className={classes.item}>
                        <Typography variant="body1">
                            <b>Telèfon</b>
                        </Typography>
                        <Typography variant="body1">
                            {store["phone_number"]}
                        </Typography>
                    </Grid>}
                    {store["website"] && <Grid item xs={6} className={classes.item}>
                        <Typography variant="body1">
                            <b>Pàgina web</b>
                        </Typography>
                        <Typography variant="body1">
                            {store["website"]}
                        </Typography>
                    </Grid>}
                    {store["description"] && <Grid item xs={6} className={classes.item}>
                        <Typography variant="body1">
                            <b>Descripció de la botiga</b>
                        </Typography>
                        <Typography variant="body1">
                            {store["description"]}
                        </Typography>
                    </Grid>}
                    {store["delivery"] && <Grid item xs={6} className={classes.item}>
                        <Typography variant="body1">
                            <b>La botiga pot enviar comandes</b>
                        </Typography>
                    </Grid>}
                </Grid>
                <Grid item xs={12} className={classes.divider}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6" className={classes.horariTitle}>
                                <b>Horari</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} className={classes.horariContent}>
                            {renderHorari()}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}