import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, Typography, makeStyles, TextField } from '@material-ui/core';
import { UnitDict } from '../../services/Dictio/UnitDicto';

const useStyles = makeStyles((theme) => ({
    info: {
        textAlign: 'right'
    }
}));

export function AddProductDialog(props) {

    const classes = useStyles();
    const [quantity, setQuantity] = React.useState(0);
    const [totalPrice, setTotalPrice] = React.useState(0);

    function handleChange(e){
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

    function handleAccept(){
        var product = props.product;
        if(parseFloat(quantity) <= 0) {
            props.onClose()
        }
        product["quantity"] = quantity;
        props.onAccept(product);
    }

    return (
        <Dialog fullWidth={true} maxWidth="sm" open={props.open} onClose={props.close} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Grid container
                            justify="flex-end"
                    >
                        <Grid item xs={8}>
                            <Grid container justify="space-between" className={classes.info}>
                                <Grid item  xs={3}>
                                    <Typography variant="subtitle1">
                                        <i><b>Quantitat</b></i>
                                    </Typography>
                                </Grid>
                                <Grid item  xs={3}>
                                    <Typography variant="subtitle1">
                                        <i><b>Unitat</b></i>
                                    </Typography>
                                </Grid>
                                <Grid item  xs={3}>
                                    <Typography variant="subtitle1">
                                        <i><b>Preu / Unitat</b></i>
                                    </Typography>
                                </Grid>
                                <Grid item  xs={3}>
                                    <Typography variant="subtitle1">
                                        <i><b>Preu</b></i>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                
                
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography variant="body1">
                                {props.product["name"]}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container justify="space-between" className={classes.info}>
                                <Grid item xs={3}>
                                        <TextField
                                            value={quantity}
                                            onChange={(e)=>handleChange(e)}
                                        />
                                </Grid>
                                <Grid item xs={3}>
                                <Typography variant="body1">
                                {UnitDict[props.product["price_type"]]}
                                </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                <Typography variant="body1">
                                    {props.product["price"]}
                                </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                <Typography variant="body1">
                                    {
                                        totalPrice
                                    } €
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleAccept()} color="primary"> Aceptar </Button>
                <Button onClick={props.onClose} color="primary" autoFocus> Cancelar </Button>
            </DialogActions>
        </Dialog>
    )
}