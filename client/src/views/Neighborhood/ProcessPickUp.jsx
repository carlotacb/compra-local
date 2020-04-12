import React from "react";
import { Grid } from "@material-ui/core";
import { HelperCard } from '../../components';

export function ProcessPickUp(props) {

    const getAllCurrentOrdersPickUp = () => {
        const resp = props.information;
        const pickUpOrders = [];

        for (var i = 0; i < resp.length; ++i) {
            pickUpOrders.push(<HelperCard user={resp[i].user} orderList={resp[i].order_list} total={resp[i].total} orderID={resp[i].id}/>);
        }

        return pickUpOrders;        
    }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                {getAllCurrentOrdersPickUp()}
            </Grid>
        </Grid>
    )
}