import React from "react";
import { Grid } from "@material-ui/core";
import { CompletedOrderCard } from '../../components';

export function CompletedOrders(props) {

    const getAllCompletedOrders = () => {
        const resp = props.completedOrders;
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