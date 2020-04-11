import React from 'react';
import {PurchaseCartInfo } from './PurchaseCartInfo';
import { PurchasePersonInfo } from './PurchasePersonInfo';
import { PurchaseSelect } from './PurchaseSelect';
import { Typography, makeStyles } from '@material-ui/core';
import { PrimaryButton } from '../../../shared-components/Button/PrimaryButton';

const useStyles = makeStyles((theme) => ({
    select: {
        paddingTop: theme.spacing(2)
    },
    button: {
        float: 'right',
        paddingTop: theme.spacing(2)
    }
}));

export function PurchaseMain(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState('recollir');


    // TODO: Make api call
    function handleClick() {

    }

    return (
        <div>
            <Typography variant="h6" color="primary">
                <b>Informació a confirmar:</b>
            </Typography>
            <PurchasePersonInfo />
            <PurchaseCartInfo cart={props.cart}/>
            <div className={classes.select}>
                <PurchaseSelect value={value} setValue={setValue} />
            </div>
            <div className={classes.button}>
                <PrimaryButton onClick={() => handleClick()}>
                    CONFIRMAR COMPRA
                </PrimaryButton>
            </div>
        </div>
    );
}