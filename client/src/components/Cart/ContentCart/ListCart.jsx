
import React from 'react';
import { Typography, makeStyles, Grid, IconButton, useTheme } from '@material-ui/core';
import { CartContext } from '../../../context/CartContext';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {UnitDict} from '../../../services/Dictio/UnitDicto';

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
        marginLeft: `-1em`,
    }
}));

export function ListCart() {
    const classes = useStyles();
    const { cart, setCart } = React.useContext(CartContext);
    var total = 0.0;

    function handleRemoveProduct(e) {
        const id = e.currentTarget.id;
        let acart = [...cart];
        for (var i in acart) {
            if (acart[i]["id"] == parseInt(id)) {
                acart.splice(i, 1);
            }
        }
        setCart(acart);
    }

    function renderProducts() {
        var output = [];
        for (var i in cart) {
            const fprice = (cart[i]['price'] * cart[i]['quantity']);
            const price = (Math.round((fprice + Number.EPSILON) * 100) / 100);

            total += price;
            // Product Name
            output.push(
                <Grid item xs={6} className={classes.cardProduct}>
                    <IconButton id={cart[i]["id"]} onClick={(e) => handleRemoveProduct(e)}>
                        <RemoveCircleIcon color="primary" fontSize="small" />
                    </IconButton>
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
                            {cart[i]['quantity']} {UnitDict[cart[i]['unit']]}
                        </Typography>
                        <Typography variant="subtitle2">
                            <i> {cart[i]['price']} € /  {UnitDict[cart[i]['price_type']]}</i>
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


    function renderTotal() {
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

    // Check if cart empty
    if (cart.length == 0) {
        return (
            <Typography variant="subtitle1">
                El teu carret de la compra està buit.
            </Typography>
        )
    }

    return (
        <div>
            {renderProducts()}
            {total > 0 && renderTotal()}
        </div>
    );
}