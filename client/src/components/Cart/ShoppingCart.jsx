
import React from 'react';
import { Typography, makeStyles} from '@material-ui/core';
import { ListView } from '../';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ContentCartMain } from './ContentCart/ContentCartMain';
import { PurchaseContext } from '../../context';
const useStyles = makeStyles((theme) => ({

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
    const [step, setStep] = React.useState(0);
    const purchaseProviderValue = React.useMemo(
        ()=> ({step, setStep}), [step, setStep]
    );


    return (
        <div>
            <div className={classes.header}>
                <ShoppingCartIcon fontSize="big" />
                <Typography variant="h6">
                    <b>La teva compra</b>
                </Typography>
            </div>
            <PurchaseContext.Provider value={purchaseProviderValue}>
                <ListView
                    className={classes.root}
                >
                    <ContentCartMain />
                </ListView>
            </PurchaseContext.Provider>
        </div>
    )
}