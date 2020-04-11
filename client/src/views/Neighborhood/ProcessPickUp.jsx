import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { Grid } from "@material-ui/core";
import { HelpingProcessCard } from '../../components';
import { ApiFactory } from "../../services/ApiFactory";

export function ProcessPickUp() {
    const { id } = useParams();
    const [ helpersPetitions, setHelpersPetitions ] = useState([]);

    React.useEffect(function getProcesHelper() {
        const getProcesHelperAPI = ApiFactory.get('getProcesHelper');
        getProcesHelperAPI(id).then((res) => {
            setHelpersPetitions(res);
        });
    }, []);

    const getAllCurrentOrdersPickUp = () => {
        const resp = helpersPetitions;
        const pickUpOrders = [];

        for (var i = 0; i < resp.length; ++i) {
            pickUpOrders.push(<HelpingProcessCard user={resp[i].user} orderList={resp[i].order_list} total={resp[i].total} />);
        }

        return pickUpOrders;        
    }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                {getAllCurrentOrdersPickUp()}
            </Grid>
        </Grid>
    )
}