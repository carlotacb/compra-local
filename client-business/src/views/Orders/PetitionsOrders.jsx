import React from "react";
import { Grid } from "@material-ui/core";
import { PetitionOrderCard } from '../../components'

export function PetitionOrders(props) {

    const getAllPendingOrders = () => {
        const resp = props.information;
        const orders = [];

        for (var i = 0; i < resp.length; ++i) {
            const order = resp[i];
            console.log(order)
            orders.push(<PetitionOrderCard client={order.client} total={order.total} status={order.order_type} ticket={order.ticket}/>)
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