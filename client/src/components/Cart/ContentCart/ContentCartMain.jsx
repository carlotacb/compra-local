import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { ListCart } from './ListCart';
import { PrimaryButton } from '../../../shared-components';
import {HeaderCart } from './HeaderCart';
import { PurchaseContext } from '../../../context';
import { PurchaseMain } from '../PurchaseSummary/PurchaseMain';
import { CartContext } from '../../../context/CartContext';
import { ApiFactory } from '../../../services/ApiFactory';
import {ConfirmationOrder} from '../Confirmation/ConfirmationMessage';
import { UserContext } from '../../../context/UserContext';
import {StoreContext} from '../../../context/StoreContext';

const useStyles = makeStyles((theme) => ({
    buttonComprar: {
        marginTop: theme.spacing(4) 
    }
}));



export function ContentCartMain() {
    const classes = useStyles();
    const { step, setStep } = React.useContext(PurchaseContext);
    const { cart, setCart } = React.useContext(CartContext);
    const { storeInfo, setStoreInfo } = React.useContext(StoreContext);
    const { user, setUser } = React.useContext(UserContext);
    const [ temporalCart, setTemporalCart ] = React.useState([]);
    const [orderId, setOrderId] = React.useState(0);


    function handleClick() {
        setStep(step => step + 1);
        setTemporalCart(cart);
    }

    // TODO: Make api call
    function handleConfirm(type_deliver) {
        const createOrderApi = ApiFactory.get("createOrder");
        var products = [];
        for(var i in cart) {
            products.push( {
                product_id: cart[i]["id"],
                quantity: parseFloat(cart[i]["quantity"])
            });
        }
        createOrderApi(storeInfo["id"], user["id"], products, type_deliver)
        .then((res) => {
            setOrderId(res["order_id"])
            setStep(step => step + 1);
        });
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
        return <PurchaseMain cart={temporalCart} onConfirm={(value) => handleConfirm(value)} />
    }
    else {
        return <ConfirmationOrder orderId={orderId} />
    }


}