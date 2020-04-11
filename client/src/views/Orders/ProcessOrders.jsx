import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Grid } from "@material-ui/core";
import { OrderCard } from '../../components';
import { ApiFactory } from "../../services/ApiFactory";

export function ProcessOrders() {
    const { id } = useParams();
    const [ currentOrders, setCurrentOrders ] = useState([]);

    useEffect(function getStoreInfo() {
        const getCurrentOrdersAPI = ApiFactory.get('getCurrentOrders');
        getCurrentOrdersAPI(id).then((res) => {
            setCurrentOrders(res);
        });
    }, []);


    const getAllCurrentOrders = () => {
        const resp = currentOrders;
        const orders = [];

        for (var i = 0; i < resp.length; ++i) {
            orders.push(<OrderCard step={resp[i].step} local_name={resp[i].local_name} total={resp[i].total} ticket={resp[i].ticket}/>)
        }
    }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                {getAllCurrentOrders()}
            </Grid>
        </Grid>
    )
}