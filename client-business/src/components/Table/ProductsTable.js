import React from 'react';
import {ViewProductTable} from './ViewProductTable';
import { ApiFactory } from '../../services/ApiFactory';
import { StoreContext } from '../../context/';
import { EditProductsTable } from './EditProductsTable';
import { ListView } from '../ListView/ListView';
import { Typography, Grid, IconButton, makeStyles, Button } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
    title: {
        display:'flex',
        justifyContent: 'space-between',

        paddingBottom: theme.spacing(1),
        alignContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginBottom: theme.spacing(1)
    }
}));

export function ProductsTable(props) {
    const classes = useStyles();
    const [products, setProducts] = React.useState([]);
    const [loadP, setLoadP] = React.useState(0);
    const [edit, setEdit] = React.useState(false);
    const { store, setStore } = React.useContext(StoreContext);

    React.useEffect(() => {
        if (store["id"]) {
            const getProductsAPI = ApiFactory.get("getProducts");
            getProductsAPI(store["id"])
                .then((res) => {
                    if (!res["error"]) {
                        setProducts(res["products"])
                    }

                })
        }

    }, [loadP]);

    function handleEdit(){
        setEdit(!edit);
    }


    return (
        <ListView>
            <Grid item xs={12} className={classes.title}>
                <Typography variant="h6" color="primary">
                    Llistat dels teus productes disponibles: 
                </Typography>
                <Button className={classes.button} onClick={()=>handleEdit()}>
                    <AddBoxIcon /> AFEGIR PRODUCTE
                </Button> 
            </Grid>
            <EditProductsTable products={products} />
        </ListView>
    )
}