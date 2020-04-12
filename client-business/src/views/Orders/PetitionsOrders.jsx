import React from "react";
import { Grid } from "@material-ui/core";
import { PetitionOrderCard } from '../../components'

export function PetitionOrders(props) {

    // const getAllPendingOrders = () => {
    //     const resp = props.orders;
    //     const orders = [];

    //     for (var i = 0; i < resp.length; ++i) {
    //         const order = resp[i];
    //         console.log(order)
    //         orders.push(<PetitionOrderCard  />)
    //     }
        
    //     return orders
    // }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                <PetitionOrderCard />
            </Grid>
        </Grid>
    )
}