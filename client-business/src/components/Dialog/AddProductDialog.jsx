import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ApiFactory } from '../../services/ApiFactory';
import { UserContext } from '../../context/UserContext';
import {Grid, TextField, makeStyles} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    textField: {
        margin: theme.spacing(2),
        '& > div': {
            borderRadius: '0',
            backgroundColor: 'white'
        }
    }
}));

export function AddProductDialog(props) {
    const {user, setUser} = React.useContext(UserContext);
    const classes = useStyles();

    const [product, setProduct] = React.useState({
        description: "",
        name: "",
        price_type: "",
        price: "",
        product_category: ""
    })


    function addProduct(){
        const addProductAPI = ApiFactory.get('addProduct');
        addProductAPI(user["local_id"], product)
            .then((res)=>{
                if(!res["error"]) {
                    props.onClick();
                }
            })
    }

    function handleChange(e){
        var id = e.currentTarget.id;
        var value = e.currentTarget.value;
        setProduct({
            ...product,
            [id]: value
        });
    }

    return (
        <Dialog open={props.open} onClose={props.onClick} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
            <DialogTitle id="alert-dialog-title">Afegeix un nou producte:</DialogTitle>
            <DialogContent>
                <div>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField 
                        className={classes.textField}
                            id="name"
                            label="Nom del producte"
                            onChange={(e) => handleChange(e)}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField 
                            className={classes.textField}
                            id="product_category"
                            label="Categoria del producte"
                            onChange={(e) => handleChange(e)}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField 
                        className={classes.textField}
                            id="price_type"
                            label="Unitat del producte"
                            onChange={(e) => handleChange(e)}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                        className={classes.textField}
                            label="Preu per unitat"
                            id="price"
                            type="number"
                            onChange={(e) => handleChange(e)}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <TextField 
                            fullWidth
                            className={classes.textField}
                            id="description"
                            label="Descripció"
                            onChange={(e) => handleChange(e)}
                            variant="outlined"
                            multiline
                            rows={4}
                        />
                    </Grid>
                </Grid>
         
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClick} color="primary" autoFocus> Cancel·lar </Button>
                <Button onClick={() => addProduct()} color="primary"> Acceptar </Button>
            </DialogActions>
        </Dialog>
    )
} 