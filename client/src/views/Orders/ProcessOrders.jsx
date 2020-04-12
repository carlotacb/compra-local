import React from "react";
import { Grid } from "@material-ui/core";
import { OrderCard, OrderHelpCard, NoInfoCard } from '../../components';

export function ProcessOrders(props) {

    const getAllCurrentOrders = () => {
        const resp = props.currentOrders;
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

        if (orders.length === 0) {
            orders.push(<NoInfoCard information={"No tens cap comanda en procés actualment"}/>)
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