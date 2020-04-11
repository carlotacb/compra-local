
import React from 'react';
import { Typography, makeStyles, Grid, IconButton, useTheme } from '@material-ui/core';
import { ListView } from '../';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { CartContext } from '../../context/CartContext';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

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
    }
}));

export function ShoppingCart() {
    const classes = useStyles();
    const {cart, setCart} = React.useContext(CartContext);

    function renderItems() {
        var output = [];
        
        for(var i in cart){
            output.push(
                <Grid container
                        justify="space-between"
                        alignItems="center"
                >
                    <Grid item xs={6} className={classes.cardProduct}>
                        <IconButton>
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
                                    Math.round((
                                        (cart[i]['price_unit'] * cart[i]['quantity']) + Number.EPSILON
                                    ) * 100) / 100
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
                {renderItems(cart)}
            </ListView>
        </div>
    )
}