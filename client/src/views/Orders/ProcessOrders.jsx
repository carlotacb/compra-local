import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { OrderCard, OrderHelpCard } from '../../components';
import { ApiFactory } from "../../services/ApiFactory";
import { useCookies } from 'react-cookie';

export function ProcessOrders() {
    const [ currentOrders, setCurrentOrders ] = useState([]);
    const [ cookies ] = useCookies();

    React.useEffect(function getStoreInfo() {
        const getCurrentOrdersAPI = ApiFactory.get('getCurrentOrders');
        getCurrentOrdersAPI(cookies.iusha).then((res) => {
            setCurrentOrders(res);
        });
    }, []);


    const getAllCurrentOrders = () => {
        const resp = currentOrders;
        const orders = [];

        for (var i = 0; i < resp.length; ++i) {
            if (resp[i].helper_needed) {
                orders.push(<OrderHelpCard step={resp[i].step} local_name={resp[i].local_name} total={resp[i].total} ticket={resp[i].ticket} assigned_helper={resp[i].assigned_helper} helper={resp[i].helper}/>)
            } else if (resp[i].delivery) {
                orders.push(<OrderCard delivery={true} step={resp[i].step} local_name={resp[i].local_name} total={resp[i].total} ticket={resp[i].ticket}/>)
            } else {
                orders.push(<OrderCard delivery={false} step={resp[i].step} local_name={resp[i].local_name} total={resp[i].total} ticket={resp[i].ticket}/>)
            }
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