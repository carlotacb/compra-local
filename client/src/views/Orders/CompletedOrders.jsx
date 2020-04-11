import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { Grid } from "@material-ui/core";
import { ApiFactory } from "../../services/ApiFactory";
import { CompletedOrderCard } from '../../components'

export function CompletedOrders() {
    const { id } = useParams();
    const [ completedOrders, setCompletedOrders ] = useState([]);

    React.useEffect(function getStoreInfo() {
        const getCompletedOrdersAPI = ApiFactory.get('getCompletedOrders');
        getCompletedOrdersAPI(id).then((res) => {
            setCompletedOrders(res);
        });
    }, []);


    const getAllCompletedOrders = () => {
        const resp = completedOrders;
        const orders = [];

        for (var i = 0; i < resp.length; ++i) {
            orders.push(<CompletedOrderCard date={resp[i].complition_date} local_name={resp[i].local_name} total={resp[i].total} ticket={resp[i].ticket} />)
        }
        return orders
    }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                {getAllCompletedOrders()}
            </Grid>
        </Grid>
    )
}