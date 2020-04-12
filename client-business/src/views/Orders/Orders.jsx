import React, { useState, useContext } from "react";
import { Grid } from "@material-ui/core";
import { GroupButton } from '../../shared-components/';
import { ApiFactory } from "../../services/ApiFactory";
import { StoreContext } from '../../context/StoreContext';
import { PetitionOrders } from './PetitionsOrders';
import { ProcessOrders } from "./ProcessOrders";

export function Orders() {
    const { store } = useContext(StoreContext);
    const [ page, setPage ] = useState(0);
    const [ petitionOrder, setPetitionOrder ] = useState('');
    const [ processOrders, setProcessOrders ] = useState('');

    const changePage = (p) => {
        setPage(p)
    }
    
    const renderCorrectPage = () => {
        if (page === 0) return(<PetitionOrders information={petitionOrder} />);
        else if (page === 1) return (<ProcessOrders information={processOrders} />)
        else if (page === 2) return (<p>Que pasa chavales</p>);
    }

    React.useEffect(function getRecivedValorations() {
        if(store["id"] === "") return;
        
        const getPetitionOrdersAPI = ApiFactory.get('petitionOrders');
        getPetitionOrdersAPI(store["id"]).then((res) => {
            setPetitionOrder(res.orders);
        });

        const getProgressOrdersAPI = ApiFactory.get('processOrders');
        getProgressOrdersAPI(store["id"]).then((res) => {
            setProcessOrders(res.orders);
        });


    }, [store]);



    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                <GroupButton buttons={["Peticions de comandes", "Comandes en procés", "Comandes finalitzades"]} active={page} onClick={(p) => changePage(p)} />
                {renderCorrectPage()}
            </Grid>
        </Grid>
    )
}