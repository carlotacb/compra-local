import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { OrderHelpCard, NoInfoCard, PendingOrder } from '../../components';


const useStyles = makeStyles((theme) => ({
    item:{
        paddingBottom: theme.spacing(1)
    }
}));

export function ProcessOrders(props) {
    const classes = useStyles();
    const getAllCurrentOrders = () => {
        const resp = props.currentOrders;

        
        if (resp.lengt === 0) {
            return (<NoInfoCard information={"No tens cap comanda en procés actualment"}/>)
        }

        const orders = [];
        for (var i = 0; i < resp.length; ++i) {
            const order = resp[i].order_list[0];

            if (resp[i].helper_needed) {
                orders.push(
                    <Grid item className={classes.item}>
                        <PendingOrder order={order} assigned_helper={resp[i].assigned_helper} helper={resp[i].helper} />
                    </Grid>
                )
            } else {
                orders.push(
                    <Grid item className={classes.item}>
                        <PendingOrder order={order}/>
                    </Grid>
                )
            }
        }


        return orders
    }

    return (
        <Grid container direction="column" justify="space-between">
                {getAllCurrentOrders()}
        </Grid>
    )
}