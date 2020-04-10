
import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { ListView } from '../';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { CartContext } from '../../context/CartContext';

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
    }
}));

export function ShoppingCart() {
    const classes = useStyles();
    const {cart, setCart} = React.useContext(CartContext);

    function renderItems() {
        var output = [];
        for(var i in cart){
            output.push(
                cart[i]['name']
            )
        }
        return output;
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