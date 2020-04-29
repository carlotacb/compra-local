import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, Typography, makeStyles, Input, InputAdornment } from '@material-ui/core';
import { UnitDict } from '../../services/Dictio/UnitDicto';
import { PrimaryButton } from '../../shared-components/Button/PrimaryButton';
import { ErrorAlert } from '../../shared-components';

const useStyles = makeStyles((theme) => ({
    content: {
        color: theme.palette.grey[700]
    },
    subtitle: {
        color: theme.palette.primary.main, 
    },
    info: {
        textAlign: 'right',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'left'
        }
    },
    totalPrice: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
        textAlign: 'right',
    },
    textField: {
        marginLeft: theme.spacing(6),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0
        }
    },
    bottom: {
        paddingBottom: theme.spacing(2)
    }
}));

export function AddProductDialog(props) {

    const classes = useStyles();
    const [quantity, setQuantity] = React.useState(0);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [error, setError] = React.useState({error: false});
    function handleChange(e) {
        const v = e.currentTarget.value;
        setQuantity(v);
        if (v.length > 0) {
            setTotalPrice(
                Math.round((
                    (parseFloat(v) * parseFloat(props.product["price"])) + Number.EPSILON
                ) * 100) / 100
            )
        }
    }

    function handleAccept() {
        var product = props.product;
        if (parseFloat(quantity) <= 0) {
            setError({
                error: "La quantitat indicada no es vàlida."
            });
        }
        else{
            product["quantity"] = quantity;
            props.onAccept(product);
        }
    }

    return (
        <Dialog 
            fullWidth={true} 
            maxWidth="sm" 
            open={props.open} 
            onClose={props.close} 
            square
        >
            <DialogTitle id="alert-dialog-title" className={classes.subtitle}><b>{props.title}</b></DialogTitle>
            <DialogContent>
                <DialogContentText 
                    className={classes.content}>
                        <ErrorAlert error={error} />
                    <Grid container
                        direction="row"
                    >
                        <Grid item lg={6} sm={12}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="subtitle1" className={classes.subtitle}>
                                        <b>Nom del producte</b>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">
                                        {props.product["name"]}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <Grid container direction="row" >
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" className={`${classes.info} ${classes.subtitle}`}>
                                        <b>Preu / Unitat</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" className={`${classes.info} ${classes.subtitle}`}>
                                        <b>Quantitat</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" className={classes.info}>
                                        {props.product["price"]} / {UnitDict[props.product["price_type"]]}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Input
                                        onChange={(e) => handleChange(e)}
                                        value={quantity}
                                        className={classes.textField}
                                        endAdornment={<InputAdornment position="end">{UnitDict[props.product["price_type"]]}</InputAdornment>}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.totalPrice}>
                            <Typography variant="subtitle1">
                                <b>Preu total:</b> {totalPrice} €
                            </Typography>
                        </Grid>
                    </Grid> 
 

                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.bottom}>
                <PrimaryButton onClick={() => handleAccept()} color="primary"> Aceptar </PrimaryButton>
                <Button onClick={props.onClose} color="primary" autoFocus> Cancelar </Button>
            </DialogActions>
        </Dialog>
    )
}