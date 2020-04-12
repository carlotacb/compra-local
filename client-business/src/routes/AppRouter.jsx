import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { Sidebar } from '../components';

import { Grid, makeStyles } from '@material-ui/core';
import { Profile, Orders } from '../views';

import { UserContext } from '../context';
import { ApiFactory } from '../services/ApiFactory';
import { StoreContext } from '../context/StoreContext';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'inherit'
    },
    page: {
        padding: theme.spacing(7)
    }
}));


export function AppRouter() {

    let match = useRouteMatch();
    const [cookies, setCookie] = useCookies(['iusha-bs']);
    const [userI, setUserI] = React.useState(0)
    const classes = useStyles();
    const { user, setUser } = React.useContext(UserContext); 
    const { store, setStore } = React.useContext(StoreContext); 



    React.useEffect(() => {
        if("iusha-bs" in cookies && user === undefined) {
            const getUserAPI = ApiFactory.get("getUserInformation");
            getUserAPI(cookies["iusha-bs"])
                .then((res)=>{
                    setUser(res["user"]);
                    if (res["user"]["local_id"] != null) {
                        const getStoreInfomationAPI = ApiFactory.get("getStoreInfomation");
                        getStoreInfomationAPI(res["user"]["local_id"])
                            .then((res) => {
                                setStore(res["store"])
                            });
                    }
                });
        }
    },[userI]);

    if( !("iusha-bs" in cookies) || cookies["iusha-bs"] == undefined) {
        return <Redirect to="/login" />
    }

    return (
        <Grid container className={classes.root}>
            <Grid item xs={2}>
                <Sidebar />
            </Grid>
            <Grid item xs={10} className={classes.page}>
                
                    <Switch>
                        <Route path={`${match.path}/botiga`}>
                            <Profile />
                        </Route>
                        <Route exact path={`${match.path}/`}>
                            <Orders />
                        </Route>
                    </Switch>
                
            </Grid>
        </Grid>
    )
}


