import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { GroupButton } from '../../shared-components/';
import { ProcessOrders, CompletedOrders } from "../../views";

export function Orders() {
    const [ page, setPage ] = useState(0);

    const changePage = (p) => {
        setPage(p)
    }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                <GroupButton buttons={["Comandes en procés", "Comandes completades"]} active={page} onClick={(p) => changePage(p)} />
                {(page === 0) ? <ProcessOrders /> : <CompletedOrders />}
            </Grid>
        </Grid>
    )
}
