import React from "react";
import { Grid } from "@material-ui/core";
import { PetitionOrderCard } from '../../components'
import { CompletedOrderCard } from "../../components/Cards/CompletedOrderCard";

export function CompletedOrders(props) {

    const getAllCompletedOrders = () => {
        const resp = props.information;
        const orders = [];

        for (var i = 0; i < resp.length; ++i) {
            const order = resp[i];
            console.log(order)
            orders.push(<CompletedOrderCard client={order.client} total={order.total} ticket={order.ticket} orderID={order.id}/>)
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