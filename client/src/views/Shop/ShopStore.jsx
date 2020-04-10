import React from "react";
import { Grid } from "@material-ui/core";
import { StoreHeader, StoreBody } from "../../components";
import { StoreContext } from "../../context";

export function ShopStore() {

    
    const [storeInfo, setStoreInfo] = React.useState("mec");
    const storeProviderValue = React.useMemo(
        ()=> ({storeInfo, setStoreInfo}), [storeInfo, setStoreInfo]
        );
    
    // Value by effects

    return (
        <StoreContext.Provider value={storeProviderValue}>
            <Grid container direction="column">
                <Grid item>
                    <StoreHeader/>
                </Grid> 
                <Grid item>
                    <StoreBody />
                </Grid>
            </Grid>
        </StoreContext.Provider>
    )
}
