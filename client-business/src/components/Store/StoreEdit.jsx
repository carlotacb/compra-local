import React from "react";
import { Grid, Paper, makeStyles, Typography, TextField } from "@material-ui/core";

export function StoreEdit() {

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


    function handleChange(e){
        const id = e.currentTarget.id;
        const v = e.target.value;

        setStoreInfo( {
            ...storeInfo,
            [id]: v
        })
    }


    function renderSchedule() {

    }



    return (
        <Grid
            container
            direction ="row"
        >
            <Grid item xs={6}>
                <div>
                    <TextField
                        fullWidth
                        variant="outlined"
                        required
                        autoFocus
                        id="store_name"
                        label="Nom de la empresa"
                        name="company"
                        onChange={(e)=> handleChange(e)}                     
                    />
                </div>
            </Grid>

        </Grid>
    )
}