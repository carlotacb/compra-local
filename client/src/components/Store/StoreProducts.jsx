import React from 'react';
import { Grid, makeStyles, Typography, useTheme } from '@material-ui/core';
import { SearchBox } from '..';
import { StoreContext } from '../../context/StoreContext';
import { ListView, AddProductDialog } from '../';

import { StoreProductItem } from './StoreProductItem';
import { AddProductContext } from '../../context/AddProductContext';
import { CartContext } from '../../context/CartContext';
import { ProductTypeDict } from '../../services/Dictio/ProductTypeDict';

const useStyles = makeStyles((theme) => ({
    search: {
        padding: theme.spacing(2),
        paddingLeft: 0,
        paddingBottom: theme.spacing(1)
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

    function handleCancel(){
        setDialogOpen(false);
        openAddProduct["open"] = false;
        openAddProduct["product"] = undefined;
        setOpenAddProduct(openAddProduct);
    }

    function handleAcceptProduct(product){
        var repeated = false;
        var acart = [...cart];
        for(var i in acart) {
            if (acart[i]["id"] == product["id"]){
                acart[i]["quantity"] = product["quantity"];
                repeated = true;
            }
        }
        if(!repeated) {
            setCart([
                ...cart,
                product
            ]);
        }
        else {
            setCart(acart);
        }
        
        // RESET
        openAddProduct["open"] = false;
        openAddProduct["product"] = undefined;
        setOpenAddProduct(openAddProduct);
        setDialogOpen(false);
    }

    function renderProducts(){
        const products = storeInfo["products"];
        var productsDict = {}
        for(var i in products) {
            var cat = products[i]["product_group_id"];
            if(cat in productsDict) {
                productsDict[cat].push(products[i]);
            }
            else{
                productsDict[cat] = [products[i]];
            }
        }

        for(var i in productsDict){
            const category = productsDict[i];
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
                            <b>{ProductTypeDict[i]}</b>
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
                onClose={() => handleCancel()}
                product={openAddProduct["product"]}
                />
            }
        </Grid>
    )
}
