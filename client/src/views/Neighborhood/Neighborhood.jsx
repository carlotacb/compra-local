import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { GroupButton } from '../../shared-components/';
import { ProcessPickUp } from '../../views'

export function Neighborhood() {
    const [ page, setPage ] = useState(0);

    const changePage = (p) => {
        setPage(p)
    }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                <GroupButton buttons={["Recollida en procés", "Peticions de recollida"]} active={page} onClick={(p) => changePage(p)} />
                {(page === 0) ? <ProcessPickUp /> : <h1>Adeu</h1>}
            </Grid>
        </Grid>
    )
}

