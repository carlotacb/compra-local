import React from 'react';
import { Grid, makeStyles, Typography, useTheme, IconButton } from '@material-ui/core';
import { SearchBox } from '..';
import { StoreContext } from '../../context/StoreContext';
import { ListView } from '../Listview/ListView';
import { TertiaryButton } from '../../shared-components/Button/TertiaryButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles((theme) => ({
    search: {
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    productItem: {
        margin: theme.spacing(2),
        marginLeft: 0,
        borderBottom: '1px solid ' + theme.palette.grey[500]
    },
    rightSide: {
        display: 'flex',
        alignItems: 'center'
    },
    boxCategory: {
        borderBottom: '3px solid ' + theme.palette.primary.dark
    }
}));

export function StoreProducts() {

    const { storeInfo, setStoreInfo } = React.useContext(StoreContext);
    const classes = useStyles();
    const theme = useTheme();

    var productsList = [];


    function renderProduct(name, description, price, unit) {
        return (
            <Grid container
                 justify="space-between"
                 className={classes.productItem}
            >
                <Grid item>
                    <Typography variant="body1">
                        {name}
                    </Typography>    
                    <Typography variant="subtitle2">
                        {description}
                    </Typography>    
                </Grid>
                <Grid item className={classes.rightSide}>
                    <Typography>
                            {price} € / {unit}
                    </Typography>
                    <IconButton
                        styles={{padding: 0, margin: 0}}
                    >
                        <AddBoxIcon color="primary" />
                    </IconButton >
                </Grid>
            </Grid>
        )
    }

    function renderProducts(){
        const products = storeInfo["products"];
        for(var i in products){
            const category = products[i];
            var categoryRender = [];
            for(var j in category) {
                categoryRender.push(
                    renderProduct(
                        category[j]['name'],
                        category[j]['description'],
                        category[j]['price'],
                        category[j]['unit']
                    )
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
