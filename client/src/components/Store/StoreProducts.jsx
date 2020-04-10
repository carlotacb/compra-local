import React from 'react';
import { Grid, makeStyles, Typography, useTheme } from '@material-ui/core';
import { SearchBox } from '..';
import { StoreContext } from '../../context/StoreContext';
import { ListView } from '../';

import { StoreProductItem } from './StoreProductItem';

const useStyles = makeStyles((theme) => ({
    search: {
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
}));

export function StoreProducts() {

    const { storeInfo, setStoreInfo } = React.useContext(StoreContext);

    const classes = useStyles();
    const theme = useTheme();

    var productsList = [];


    function renderProducts(){
        const products = storeInfo["products"];
        for(var i in products){
            const category = products[i];
            var categoryRender = [];
            for(var j in category) {
                categoryRender.push(
                    <StoreProductItem  item={category[j]}/>
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
        </Grid>
    )
}
