import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { OrderCard, OrderHelpCard } from '../../components';
import { ApiFactory } from "../../services/ApiFactory";
import { useCookies } from 'react-cookie';

export function ProcessOrders() {
    const [ currentOrders, setCurrentOrders ] = useState([]);
    const [ cookies ] = useCookies();

    React.useEffect(function getStoreInfo() {
        const getCurrentOrdersAPI = ApiFactory.get('getCurrentOrders');
        getCurrentOrdersAPI(cookies.iusha).then((res) => {
            setCurrentOrders(res.orders);
        });
    }, []);


    const getAllCurrentOrders = () => {
        const resp = currentOrders;
        const orders = [];

        for (var i = 0; i < resp.length; ++i) {
            const order = resp[i].order_list[0];

            if (resp[i].helper_needed) {
                orders.push(<OrderHelpCard step={order.step} local_name={order.local_name} total={order.total} ticket={order.ticket} assigned_helper={resp[i].assigned_helper} helper={resp[i].helper}/>)
            } else if (order.delivery) {
                orders.push(<OrderCard delivery={true} step={order.step} local_name={order.local_name} total={order.total} ticket={order.ticket}/>)
            } else {
                orders.push(<OrderCard delivery={false} step={order.step} local_name={order.local_name} total={order.total} ticket={order.ticket}/>)
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