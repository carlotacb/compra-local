import React from "react";
import { Grid } from "@material-ui/core";
import { ProcessOrderCard } from "../../components";

export function ProcessOrders(props) {

    const getAllInProcessOrders = () => {
        const resp = props.information;
        const orders = [];

        for (var i = 0; i < resp.length; ++i) {
            const order = resp[i];
            console.log(order);
            orders.push(<ProcessOrderCard client={order.client} total={order.total} type={order.order_type} status={order.status} ticket={order.ticket} orderID={order.id}/>)
        }
        
        return orders
    }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                {getAllInProcessOrders()}
            </Grid>
        </Grid>
    )
}