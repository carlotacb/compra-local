import React from 'react';
import { Grid, makeStyles, Typography, useTheme } from '@material-ui/core';
import { SearchBox } from '..';
import { StoreContext } from '../../context/StoreContext';
import { ListView, AddProductDialog } from '../';

import { StoreProductItem } from './StoreProductItem';
import { AddProductContext } from '../../context/AddProductContext';
import { CartContext } from '../../context/CartContext';

const useStyles = makeStyles((theme) => ({
    search: {
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    dialog: {
        width: '45em'
    }
}));

export function StoreProducts() {

    const { storeInfo, setStoreInfo } = React.useContext(StoreContext);
    const {cart, setCart} = React.useContext(CartContext);
    
    const [openAddProduct, setOpenAddProduct] = React.useContext(AddProductContext);
    const [ isDialogOpen, setDialogOpen ] = React.useState(openAddProduct["open"]);
    

    const classes = useStyles();
    const theme = useTheme();

    var productsList = [];

    function handleAddProduct() {
        setDialogOpen(true);
    }

    function handleAcceptProduct(product){
        
        setCart(
            [...cart,
                product]
        )
        // RESET
        openAddProduct["open"] = false;
        openAddProduct["product"] = undefined;
        setOpenAddProduct(openAddProduct);
        setDialogOpen(false);
    }

    function renderProducts(){
        const products = storeInfo["products"];
        for(var i in products){
            const category = products[i];
            var categoryRender = [];
            for(var j in category) {
                categoryRender.push(
                    <StoreProductItem  
                        onAddProduct = {(p) => handleAddProduct(p)}
                        item={category[j]}
                    />
                )
            }
            productsList.push(
                <div>
                    <div className={classes.boxCategory}>
                        <Typography variant="h6">
                            <b>{i}</b>
                        </Typography>
                    </div>
                    <div>
                        {categoryRender}
                    </div>
                </div>
            )
        }

        return(
            <div>
                {productsList}
            </div>
        )
    }

    return (
        <Grid container
            direction="column"
        >
            <Grid item className={classes.search}>
                <SearchBox 
                    label="Cercar per nom"
                />
            </Grid>
            <Grid item className={classes.search}>
                <ListView background={theme.palette.grey[50]}>
                    {renderProducts()}
                </ListView>
            </Grid>
            {
                isDialogOpen &&
                <AddProductDialog 
                open={isDialogOpen}
                title="Producte"
                onAccept={(p) => handleAcceptProduct(p)}
                onClose={() => (setDialogOpen(false))}
                product={openAddProduct["product"]}
                />
            }
        </Grid>
    )
}
