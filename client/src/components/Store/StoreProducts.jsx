import React from 'react';
import { Grid } from '@material-ui/core';
import { SearchBox } from '..';
import { StoreContext } from '../../context/StoreContext';


export function StoreProducts() {
    const { storeInfo, setStoreInfo } = React.useContext(StoreContext);

    return (
        <Grid container
            direction="column"
        >
            <Grid item>
                <SearchBox 
                    label="Cercar per nom"
                />
            </Grid>
        </Grid>
    )
}
