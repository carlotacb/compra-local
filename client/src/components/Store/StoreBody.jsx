import React from 'react';
import { Grid } from '@material-ui/core';

import { StoreInformation } from './StoreInformation';
import { GroupButton } from '../../shared-components';
import { StoreProducts } from './StoreProducts';
import { ShoppingCart } from '../';
import { CartContext } from '../../context/CartContext';
import { AddProductContext } from '../../context/AddProductContext';


export function StoreBody(props) {
    const [page, setPage] = React.useState(0);
    
    // Card context
    const [cart, setCart] = React.useState([
        {
            'id': 5,
            'name': 'Plàtan',
            'quantity': '0.2',
            'unit': 'kg',
            'price_unit': '1.5',
        }
    ]);
    const cartProviderValue = React.useMemo(
        ()=> ({cart, setCart}), [cart, setCart]
    );

    // Add product context
    const [openAddProduct, setOpenAddProduct] = React.useState({
        'open': false,
        'product': undefined
    });
    const openAddProductProvider = React.useMemo(
        () => ({openAddProduct, setOpenAddProduct}, [openAddProduct, setOpenAddProduct])
    )

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
                            <AddProductContext.Provider value={openAddProductProvider}>
                                {renderPage()}
                            </AddProductContext.Provider>           
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