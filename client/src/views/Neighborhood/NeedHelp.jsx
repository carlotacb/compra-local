import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { Grid } from "@material-ui/core";
import { HelperPetitionCard } from '../../components';
import { ApiFactory } from "../../services/ApiFactory";

export function NeedHelp() {
    const { id } = useParams();
    const [ needHelp, setNeedHelp ] = useState([]);

    React.useEffect(function getNeedHelp() {
        const getNeedHelpAPI = ApiFactory.get('getNeedHelp');
        getNeedHelpAPI(id).then((res) => {
            setNeedHelp(res);
        });
    }, []);

    const getAllPetitions = () => {
        const resp = needHelp;
        const petitions = [];

        for (var i = 0; i < resp.length; ++i) {
            petitions.push(<HelperPetitionCard user={resp[i].user} orderList={resp[i].order_list} total={resp[i].total} />);
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