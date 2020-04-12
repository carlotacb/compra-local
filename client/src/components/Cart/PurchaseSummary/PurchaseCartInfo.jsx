import React from 'react';
import { CartContext } from '../../../context';
import { ListCart } from '../ContentCart/ListCart';
import { HeaderCart } from '../ContentCart/HeaderCart';
import { Typography, makeStyles, Grid, IconButton, useTheme } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    prices: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(0.5)
        },
        justifyContent: 'space-between'
    },
    cardProduct: {
        display: 'flex',
        alignItems: 'center',
    }
}));

export function PurchaseCartInfo(props) {


    const classes = useStyles();
    var total = 0;

    function renderItems(){
        var output = [];
        const cart = props.cart;
        for(var i in cart) {
            // Product
            const fprice = (cart[i]['price_unit'] * cart[i]['quantity']);
            const price = (Math.round((fprice + Number.EPSILON) * 100) / 100);

            total += price;
            // Product Name
            output.push(
                <Grid item xs={6} className={classes.cardProduct}>
                    <Typography variant="body1">
                        {cart[i]['name']}
                    </Typography>
                </Grid>
            );

            // Product info
            output.push(
                <Grid item xs={6}>
                    <div className={classes.prices}>
                        <Typography variant="subtitle2">
                            {cart[i]['quantity']} {cart[i]['unit']}
                        </Typography>
                        <Typography variant="subtitle2">
                            <i> {cart[i]['price_unit']} € /  {cart[i]['unit']}</i>
                        </Typography>
                        <Typography variant="subtitle2">
                            <b>
                                {
                                    price
                                } € </b>
                        </Typography>
                    </div>
                </Grid>
            );
        }
        return (
            <Grid container
            justify="space-between"
            alignItems="center"
            >
                {output}
            </Grid>
        );
    }


    function renderTotal(){
        return (
            <Grid container justify="space-between">
                <Grid item>
                    <Typography variant="h6">
                        <b>Preu total:</b>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6">
                        <b>{total} €</b>
                    </Typography>
                </Grid>
            </Grid>
        )
    }
    return (
        <div>
            <HeaderCart />
            {renderItems()}
            {renderTotal()}
        </div>
    );
}