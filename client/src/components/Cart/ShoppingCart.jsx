
import React from 'react';
import { Typography, makeStyles, Grid, IconButton, useTheme } from '@material-ui/core';
import { ListView } from '../';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { CartContext } from '../../context/CartContext';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { PrimaryButton } from '../../shared-components/Button/PrimaryButton';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'inherit'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
        '& > svg': {
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
            fill: theme.palette.primary.main
        },
        borderBottom: '4px solid ' + theme.palette.secondary.main
    },
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
    },
    buttonComprar: {
        marginTop: theme.spacing(4)
    }
}));

export function ShoppingCart() {
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

    function renderItems(total) {
        var output = [];
        if (cart.length == 0) {
            return (
                <Typography variant="subtitle1">
                    El teu carret de la compra està buit.
                </Typography>
            )
        }
        for (var i in cart) {

            var price = Math.round((
                (cart[i]['price_unit'] * cart[i]['quantity']) + Number.EPSILON
            ) * 100) / 100
            total += price;

            output.push(
                <Grid container
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item xs={6} className={classes.cardProduct}>
                        <IconButton id={cart[i]["id"]} onClick={(e) => handleRemoveProduct(e)}>
                            <RemoveCircleIcon color="primary" fontSize="small" />
                        </IconButton>
                        <Typography variant="body1">
                            {cart[i]['name']}
                        </Typography>
                    </Grid>
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
                </Grid>
            )
        }
        return (
            <div>
                <Grid container
                    justify="space-between"
                >
                    <Grid item xs={5}>
                        <Typography variant="subtitle1">
                            <b>Producte</b>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            <b>Quantitat</b>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            <b>Preu / unitat </b>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            <b>Preu total</b>
                        </Typography>
                    </Grid>
                </Grid>
                {output}
                {
                    total > 0 &&
                    renderTotal(total)
                }
            </div>
        )
    }

    function renderTotal(total) {
        return (
            <div>
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
                <Grid container justify="center" className={classes.buttonComprar}>
                    <Grid item>
                        <PrimaryButton>
                            COMPRAR
                        </PrimaryButton>
                    </Grid>
                </Grid>
            </div>
        )
    }

    return (
        <div>
            <div className={classes.header}>
                <ShoppingCartIcon fontSize="big" />
                <Typography variant="h6">
                    <b>La teva compra</b>
                </Typography>
            </div>
            <ListView
                className={classes.root}
            >
                {renderItems(total)}
            </ListView>
        </div>
    )
}