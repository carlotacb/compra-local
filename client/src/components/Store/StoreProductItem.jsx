import React from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Grid, makeStyles, Typography, IconButton } from '@material-ui/core';

import { CartContext } from '../../context/CartContext';
import { AddProductContext } from '../../context/AddProductContext';

const useStyles = makeStyles((theme) => ({
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

export function StoreProductItem(props) {
    const classes = useStyles();
    const [openAddProduct, setOpenAddProduct] = React.useContext(AddProductContext);

    const item = props.item;
    const name = item["name"];
    const id = item["id"];
    const description = item["description"];
    const unit = item["unit"];
    const price = item["price_unit"];
    

    function handleClick(e) {
        var id = e.currentTarget.id;
        openAddProduct["open"] = true;
        openAddProduct["product"] = props.item;
        setOpenAddProduct(openAddProduct);
        props.onAddProduct(id);
    }

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
                    id = {id}
                    onClick={(e) => handleClick(e)}
                    styles={{padding: 0, margin: 0}}
                >
                    <AddBoxIcon color="primary" />
                </IconButton >
            </Grid>
        </Grid>
    )
}