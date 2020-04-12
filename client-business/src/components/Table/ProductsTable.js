import React from 'react';
import {ViewProductTable} from './ViewProductTable';
import { ApiFactory } from '../../services/ApiFactory';
import { StoreContext } from '../../context/';
import { EditProductsTable } from './EditProductsTable';

export function ProductsTable(props) {
    const [products, setProducts] = React.useState([]);
    const [loadP, setLoadP] = React.useState(0);
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

    if (props.edit) {
        return <EditProductsTable products={products} />;
    }
    else {
        return <ViewProductTable products={products} />;
    }

}