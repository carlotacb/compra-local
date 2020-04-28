import React from "react";
import { Grid } from "@material-ui/core";
import { PendingReviewCard, NoInfoCard } from '../../components';
import { RateOrder } from "../../components/Orders/RateOrder";

export function PendingReviewOrder(props) {

    const getAllPendingOrders = () => {
        const resp = props.pendingReview;
        if(resp.length == 0) {
            return (
                <NoInfoCard information={"No tens cap comanda per valorar"}/>
            )
        }

        const orders = [];
        for (var i = 0; i < resp.length; ++i) {
            const order = resp[i];
            orders.push(<RateOrder order={order} />)
        }
        return orders;
    }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                {getAllPendingOrders()}
            </Grid>
        </Grid>
    )
}