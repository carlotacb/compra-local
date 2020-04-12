import React from "react";
import { useParams } from 'react-router-dom';
import { Grid } from "@material-ui/core";
import { StoreHeader, StoreBody } from "../../components";
import { StoreContext } from "../../context";
import { ApiFactory } from "../../services/ApiFactory";

export function ShopStore() {
    const { id } = useParams();
    
    const [storeInfo, setStoreInfo] = React.useState({});
    const storeProviderValue = React.useMemo(
        ()=> ({storeInfo, setStoreInfo}), [storeInfo, setStoreInfo]
    );
    
    React.useEffect(function getStoreInfo() {
        const getStoreInfoAPI = ApiFactory.get('getStoreInfo');
        getStoreInfoAPI(id).then((res) => {
            setStoreInfo(res["local"]);
        });
    }, []);


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
