import React from 'react';
import { Grid,Typography } from '@material-ui/core';

import { StoreInformation } from './StoreInformation';
import { GroupButton } from '../../shared-components';
import { StoreProducts } from './StoreProducts';
import { ShoppingCart } from '../';
import { CartContext } from '../../context/CartContext';


export function StoreBody(props) {
    const [page, setPage] = React.useState(0);
    
    const [cart, setCart] = React.useState([
        {
            'name': 'Plàtan',
            'price': '3€'
        }
    ]);
    const cartProviderValue = React.useMemo(
        ()=> ({cart, setCart}), [cart, setCart]
    );
    function renderPage() {
        if(page == 0) {
            //Productes
            return <StoreProducts />
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
                    <CartContext.Provider value={cartProviderValue}>
                        <Grid item xs={7}>
                            {renderPage()}
                        </Grid>
                        <Grid item xs={5}>
                            <ShoppingCart/>
                        </Grid>
                    </CartContext.Provider>
                </Grid>
            </Grid>
        </Grid>
    )
}