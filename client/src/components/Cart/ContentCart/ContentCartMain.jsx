import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { ListCart } from './ListCart';
import { PrimaryButton } from '../../../shared-components';
import {HeaderCart } from './HeaderCart';
import { PurchaseContext } from '../../../context';
import { PurchaseMain } from '../PurchaseSummary/PurchaseMain';
import { CartContext } from '../../../context/CartContext';

const useStyles = makeStyles((theme) => ({
    buttonComprar: {
        marginTop: theme.spacing(4) 
    }
}));

export function ContentCartMain() {
    const classes = useStyles();
    const { step, setStep } = React.useContext(PurchaseContext);
    const { cart, setCart } = React.useContext(CartContext);
    const [ temporalCart, setTemporalCart ] = React.useState([]);
    function handleClick() {
        setStep(step => step + 1);
        setTemporalCart(cart);
    }

    var dis = (cart.length == 0);

    if(step == 0){
        return(
            <div>
                <HeaderCart />
                <ListCart />
                <Grid container justify="center" className={classes.buttonComprar}>
                    <Grid item>
                        <PrimaryButton disabled={dis} onClick={() => handleClick()}>
                            COMPRAR
                        </PrimaryButton>
                    </Grid>
                </Grid>
            </div>
        )
    }
    else if(step == 1) {
        return <PurchaseMain cart={temporalCart} />
    }


}