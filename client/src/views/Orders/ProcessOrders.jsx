import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { Grid } from "@material-ui/core";
import { OrderCard, OrderHelpCard } from '../../components';
import { ApiFactory } from "../../services/ApiFactory";

export function ProcessOrders() {
    const { id } = useParams();
    const [ currentOrders, setCurrentOrders ] = useState([]);

    React.useEffect(function getStoreInfo() {
        const getCurrentOrdersAPI = ApiFactory.get('getCurrentOrders');
        getCurrentOrdersAPI(id).then((res) => {
            setCurrentOrders(res);
        });
    }, []);


    const getAllCurrentOrders = () => {
        const resp = currentOrders;
        const orders = [];

        for (var i = 0; i < resp.length; ++i) {
            if (resp[i].helper_needed) {
                orders.push(<OrderHelpCard step={resp[i].step} local_name={resp[i].local_name} total={resp[i].total} ticket={resp[i].ticket} assigned_helper={resp[i].assigned_helper} helper={resp[i].helper}/>)
            }
            else {
                orders.push(<OrderCard step={resp[i].step} local_name={resp[i].local_name} total={resp[i].total} ticket={resp[i].ticket}/>)
            }
        }
        return orders
    }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                {getAllCurrentOrders()}
            </Grid>
        </Grid>
    )
}