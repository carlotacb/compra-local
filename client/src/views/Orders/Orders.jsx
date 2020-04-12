import React, { useState, useContext } from "react";
import { Grid } from "@material-ui/core";
import { GroupButton } from '../../shared-components/';
import { ProcessOrders, CompletedOrders, PendingReviewOrder } from "../../views";
import { ApiFactory } from "../../services/ApiFactory";
import { UserContext } from '../../context/UserContext';
import { Loading } from "../../components/Loading/Loading";

export function Orders() {
    const { user } = useContext(UserContext);
    const [ page, setPage ] = useState(0);
    const [ completedOrders, setCompletedOrders ] = useState([]);
    const [ currentOrders, setCurrentOrders ] = useState([]);
    const [ pendingReview, setPendingReview ] = useState([]);

    const changePage = (p) => {
        setPage(p)
    }


    React.useEffect(function getRecivedValorations() {
        if(user === undefined) return;

        const getCompletedOrdersAPI = ApiFactory.get('getCompletedOrders');
        getCompletedOrdersAPI(user["id"]).then((res) => {
            setCompletedOrders(res.orders);
        });

        const getCurrentOrdersAPI = ApiFactory.get('getCurrentOrders');
        getCurrentOrdersAPI(user["id"]).then((res) => {
            setCurrentOrders(res.orders);
        });
        
        const getPendingReviewAPI = ApiFactory.get('getPendingReviewOrders');
        getPendingReviewAPI(user["id"]).then((res) => {
            setPendingReview(res.pending);
        });
    }, [user]);

    if(user === undefined) {
        return <Loading />
    }

    const renderCorrectPage = () => {
        if (page === 0) return(<ProcessOrders currentOrders={currentOrders}/>);
        else if (page === 1) return (<PendingReviewOrder pendingReview={pendingReview}/>)
        else if (page === 2) return (<CompletedOrders completedOrders={completedOrders} />);
    }


    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                <GroupButton buttons={["Comandes en procés", "Comandes pendents de valorar", "Comandes completades"]} active={page} onClick={(p) => changePage(p)} />
                {renderCorrectPage()}
            </Grid>
        </Grid>
    )
}
