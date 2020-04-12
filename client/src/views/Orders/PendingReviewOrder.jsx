import React from "react";
import { Grid } from "@material-ui/core";
import { PendingReviewCard } from '../../components';

export function PendingReviewOrder(props) {

    const getAllPendingOrders = () => {
        const resp = props.pendingReview;
        const orders = [];
        console.log(resp)

        for (var i = 0; i < resp.length; ++i) {
            const order = resp[i];
            console.log(order)
            orders.push(<PendingReviewCard local_name={order.local_name} helper_name={order.user_name} type={order.type}/>)
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