import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { Grid } from "@material-ui/core";
import { ApiFactory } from "../../services/ApiFactory";
import { CompletedOrderCard } from '../../components';
import { useCookies } from 'react-cookie';

export function CompletedOrders() {
    const [ completedOrders, setCompletedOrders ] = useState([]);
    const [ cookies ] = useCookies();

    React.useEffect(function getStoreInfo() {
        const getCompletedOrdersAPI = ApiFactory.get('getCompletedOrders');
        getCompletedOrdersAPI(cookies.iusha).then((res) => {
            setCompletedOrders(res.orders);
        });
    }, []);


    const getAllCompletedOrders = () => {
        const resp = completedOrders;
        const orders = [];

        for (var i = 0; i < resp.length; ++i) {
            const order = resp[i].order_list[0];
            orders.push(<CompletedOrderCard date={order.completed_date} local_name={order.local_name} total={order.total} ticket={order.ticket} />)
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