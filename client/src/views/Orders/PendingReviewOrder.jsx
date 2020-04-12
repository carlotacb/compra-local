import React from "react";
import { Grid } from "@material-ui/core";
import { CompletedOrderCard } from '../../components';

export function PendingReviewOrder(props) {

    const getAllPendingOrders = () => {
        const resp = props.pendingReview;
        const orders = [];
        console.log(resp)

        for (var i = 0; i < resp.length; ++i) {
            const order = resp[i].order_list[0];
            orders.push(<CompletedOrderCard date={order.completed_date} local_name={order.local_name} total={order.total} ticket={order.ticket} />)
        }

        return orders
    }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                {getAllPendingOrders()}
            </Grid>
        </Grid>
    )
}