import React from "react";
import { Grid, Paper, makeStyles, Typography, TextField, Divider, Checkbox } from "@material-ui/core";
import { TertiaryButton, PrimaryButton } from "../../shared-components";
import { StoreContext } from "../../context/StoreContext";
import { ApiFactory } from "../../services/ApiFactory";
import { UserContext } from "../../context/UserContext";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[50],
        width: 'inherit',
        padding: theme.spacing(2)
    },
    container: {
        marginTop: '0',
    },
    input: {
        padding: theme.spacing(2),
    },
    textField: {
        '& > div': {
            borderRadius: '0',
            backgroundColor: 'white'
        }
    },
    horari: {
        marginLeft: theme.spacing(2)
    },
    text: {
        padding: theme.spacing(1.2),
        maxWidth: '5em'
    },
    item: {
        padding: theme.spacing(0.5)
    },
    divider: {
        marginTop: theme.spacing(2),

    },
    horariText: {
        margin: theme.spacing(2),
        textAlign: 'center'
    },
    buttons: {
        float: 'right',
        display: 'left',
        alignItems: 'center',
        '& > button': {
            margin: theme.spacing(2)
        }
    },
    textCenter: {
        marginLeft: theme.spacing(2)
    },
    checkbox: {
        marginLeft: theme.spacing(1)
    }
}));

export function StoreEdit(props) {
    const classes = useStyles();

    const { store, setStore } = React.useContext(StoreContext);
    const { user, setUser } = React.useContext(UserContext);
    const [storeInfo, setStoreInfo] = React.useState()

    React.useEffect(() => {
        setStoreInfo({

            name: store["name"],
            postal_address: store["postal_address"],
            phone_number: store["phone_number"],
            website: store["website"],
            description: store["description"],
            category: store["category"],
            delivery: store["delivery"],
            hmoni: store["hmoni"],
            hmonf: store["hmonf"],
            htuei: store["htuei"],
            htuef: store["htuef"],
            hwedi: store["hwedi"],
            hwedf: store["hwedf"],
            hthui: store["hthui"],
            hthuf: store["hthuf"],
            hfrii: store["hfrii"],
            hfrif: store["hfrif"],
            hsati: store["hsati"],
            hsatf: store["hsatf"],
            hsuni: store["hsuni"],
            hsunf: store["hsunf"]

        })
    }, [store])

    function handleChangeCheckbox() {
        var st = storeInfo["delivery"];
        setStoreInfo({
            ...storeInfo,
            "delivery": !st
        })
    }

    function handleChange(e) {
        const id = e.currentTarget.id;
        const v = e.target.value;

        setStoreInfo({
            ...storeInfo,
            [id]: v
        })
    }


    function handleSubmit() {

        for(var i in storeInfo) {
            store[i] = storeInfo[i];
        }

        if(user["local_id"] != null) {
            const updateStoreInfoAPI = ApiFactory.get("updateStoreInformation");
            updateStoreInfoAPI(store)
                .then((res)=>{
                    setStore(store);
                    if (props.onSubmit) {
                        props.onSubmit()
                    }
                })
        }
        else {
            const createStoreInfoAPI = ApiFactory.get("createStoreInformation");
            createStoreInfoAPI(user["id"],store)
                .then((res)=> {
                    setStore(store);
                    setUser({
                        ...user,
                        "local_id": res["local_id"]
                    })
                    if (props.onSubmit) {
                        props.onSubmit()
                    }
                })
        }

    }


    function handleCancel() {
        if (props.onSubmit) {
            props.onSubmit()
        }
    }


    function renderDays() {
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
                    <Typography variant="body1">
                        {i}
                    </Typography>
                </Grid>
            )

            output.push(
                <Grid item xs={4} className={classes.item}>
                    <TextField
                        type="time"
                        className={classes.textField}
                        variant="outlined"
                        value={storeInfo[days[i][0]]}
                        id={days[i][0]}
                        name="company"
                        onChange={(e) => handleChange(e)}
                        InputProps={{
                            classes: {
                                input: classes.text
                            }
                        }}
                    />
                </Grid>
            )

            output.push(
                <Grid item xs={4} className={classes.item}>
                    <TextField
                        type="time"
                        className={classes.textField}
                        variant="outlined"
                        value={storeInfo[days[i][1]]}
                        id={days[i][1]}
                        name="company"
                        onChange={(e) => handleChange(e)}
                        InputProps={{
                            classes: {
                                input: classes.text
                            }
                        }}
                    />
                </Grid>
            )
        }
        return output;
    }

    if(!storeInfo){
        return <p>Loading ...</p>
    }

    return (
        <Paper
            className={classes.root}
        >
            <Grid
                container
                direction="row"
                className={classes.container}
                justify="center"
            >
                <Grid item xs={6}>
                    <div className={classes.input}>
                        <TextField
                            fullWidth
                            className={classes.textField}
                            variant="outlined"
                            required
                            autoFocus
                            id="name"
                            label="Nom de la empresa"
                            name="company"
                            value={storeInfo["name"]}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={classes.input}>
                        <TextField
                            fullWidth
                            className={classes.textField}
                            variant="outlined"
                            required
                            value={storeInfo["postal_address"]}
                            id="postal_address"
                            label="Adreça postal"
                            name="adress"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={classes.input}>
                        <TextField
                            fullWidth
                            className={classes.textField}
                            variant="outlined"
                            required
                            value={storeInfo["category"]}
                            id="category"
                            label="Categoria"
                            name="category"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={classes.input}>
                        <TextField
                            fullWidth
                            className={classes.textField}
                            variant="outlined"
                            required
                            value={storeInfo["phone_number"]}
                            id="phone_number"
                            label="Telèfon"
                            name="phone"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={classes.input}>
                        <TextField
                            fullWidth
                            className={classes.textField}
                            variant="outlined"
                            value={storeInfo["website"]}
                            id="website"
                            label="Pàgina web"
                            name="website"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.input}>
                        <TextField
                            fullWidth
                            className={classes.textField}
                            variant="outlined"
                            required
                            value={storeInfo["description"]}
                            id="description"
                            label="Descripció de l'empresa"
                            name="company"
                            onChange={(e) => handleChange(e)}
                            multiline
                            rows={6}
                        />
                    </div>
                    <div>
                        <Typography variant="body1">
                            <Checkbox
                                checked={storeInfo["delivery"]}
                                onChange={handleChangeCheckbox}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                className={classes.checkbox}
                            />
                            La meva botiga envia comandes
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Divider light />
                    <Typography variant="h6" className={classes.horariText}>
                        <b>Horari</b>
                    </Typography>
                </Grid>
                <Grid item xs={8} className={classes.horari}>
                    <Grid container
                        direction="row"
                        alignItems="center"
                    >
                        <Grid item xs={4}>
                            <Typography variant="body1">
                                <b>Dia</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1">
                                <b>Hora Inici</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1">
                                <b>Hora Final</b>
                            </Typography>
                        </Grid>
                        {renderDays()}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider light className={classes.divider} />
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.buttons}>
                        <PrimaryButton onClick={() => handleSubmit()}>
                            GUARDAR
                        </PrimaryButton>
                        <TertiaryButton onClick={() => handleCancel()}>
                            Cancelar
                        </TertiaryButton>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}