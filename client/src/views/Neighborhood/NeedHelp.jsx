import React from "react";
import { Grid } from "@material-ui/core";
import { HelperPetitionCard } from '../../components';

export function NeedHelp(props) {

    const getAllPetitions = () => {
        const resp = props.information;
        const petitions = [];
        console.log(resp);

        for (var i = 0; i < resp.length; ++i) {
            petitions.push(<HelperPetitionCard user={resp[i].user} orderList={resp[i].order_list} orderID={resp[i].id} />);
        }

        return petitions;
    }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                {getAllPetitions()}
            </Grid>
        </Grid>
    )
}