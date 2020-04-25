import React, { useState, useContext } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { GroupButton } from '../../shared-components/';
import { ProcessOrders, CompletedOrders, PendingReviewOrder } from "../../views";
import { ApiFactory } from "../../services/ApiFactory";
import { UserContext } from '../../context/UserContext';
import { Loading } from "../../components/Loading/Loading";

const useStyles = makeStyles((theme)=>({
    header: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(1)
    }
}));

export function Orders() {
    const { user } = useContext(UserContext);
    const [ page, setPage ] = useState(0);
    const [ completedOrders, setCompletedOrders ] = useState([]);
    const [ currentOrders, setCurrentOrders ] = useState([]);
    const [ pendingReview, setPendingReview ] = useState([]);

    const classes = useStyles();

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
        <Grid container direction="column">
            <Grid item className={classes.header}>
                <GroupButton buttons={["En procés", "Pendents de valorar", "Completades"]} active={page} onClick={(p) => changePage(p)} />
            </Grid>
            <Grid item>
                {renderCorrectPage()}
            </Grid>
        </Grid>
    )
}
