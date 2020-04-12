import React from "react";
import { Grid, Paper, makeStyles, Typography, TextField, Divider, Checkbox } from "@material-ui/core";
import { TertiaryButton, PrimaryButton } from "../../shared-components";


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
    buttons:{
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
    checkbox:{
        marginLeft: theme.spacing(1)
    }
}));

export function StoreEdit() {
    const classes = useStyles();
    const [checkbox, setCheckbox] = React.useState(false);

    const [storeInfo, setStoreInfo] = React.useState({
        store_name: "",
        postal_address: "",
        phone_number: "",
        website: "",
        hmoni: "",
        hmonf: "",
        htuei: "",
        htuef: "",
        hwedi: "",
        hwedf: "",
        hthui: "",
        hthuf: "",
        hfrii: "",
        hfrif: "",
        hsati: "",
        hsatf: "",
        hsuni: "",
        hsunf: "",
    })

    function handleChangeCheckbox(){
        setCheckbox(checkbox => !checkbox);
    }

    function handleChange(e) {
        const id = e.currentTarget.id;
        const v = e.target.value;

        setStoreInfo({
            ...storeInfo,
            [id]: v
        })
    }


    function renderDays() {
        var days = {
            "Dilluns": ["hmoni", "hmonf"],
            "Dimarts": ["htuei", "htuef"],
            "Dimecres": ["hwedi", "hwedf"],
            "Dijous": ["hthui", "hthuf"],
            "Divendres": ["hfrii", "hfri"],
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
                        required

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
                        required

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
                            id="store_name"
                            label="Nom de la empresa"
                            name="company"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={classes.input}>
                        <TextField
                            fullWidth
                            className={classes.textField}
                            variant="outlined"
                            required

                            id="postal_adress"
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
                            required

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
                                checked={checkbox}
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
                        <PrimaryButton>
                            GUARDAR
                        </PrimaryButton>
                        <TertiaryButton>
                            Cancelar
                        </TertiaryButton>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}