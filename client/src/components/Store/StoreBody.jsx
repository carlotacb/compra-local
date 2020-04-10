import React from 'react';
import { Grid, Button, useTheme, makeStyles, Typography } from '@material-ui/core';
import { StoreContext } from '../../context/StoreContext';
import { StoreInformation } from './StoreInformation';
import { ListView } from '../Listview/ListView';
import { GroupButton } from '../../shared-components/Button/GroupButton';




function StoreProductes() {
    const { storeInfo, setStoreInfo } = React.useContext(StoreContext);

    return (
        <p> Productes</p>
    )
}


export function StoreBody(props) {
    const [page, setPage] = React.useState(0);


    function renderPage() {
        if(page == 0) {
            //Productes
            return <p>Productes</p>
        }
        else if (page == 1) {
            return <StoreInformation />
        }
    }
    return (
        <Grid>
            <Grid item>
                <GroupButton
                    buttons = {["Produces", "Informació"]}
                    active={page} 
                    onClick={(p) => setPage(p)}/
                >
            </Grid>
            <Grid item>
                <Grid container>
                    <Grid item xs={7}>
                        {renderPage()}
                    </Grid>
                    <Grid item>
                        <ListView>
                            <Typography variant="h3">
                                La teva compra
                            </Typography>
                        </ListView>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}