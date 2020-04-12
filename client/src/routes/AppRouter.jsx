import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { ShopRouter } from './ShopRouter';
import { Sidebar } from '../components/';

import { Grid, makeStyles } from '@material-ui/core';
import { Profile, Neighborhood, Orders } from '../views';

import { UserContext } from '../context';
import { ApiFactory } from '../services/ApiFactory';

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
    const [cookies, setCookie] = useCookies();
    const classes = useStyles();
    const { user, setUser } = React.useContext(UserContext); 
    

    React.useEffect(() => {
        if("iusha" in cookies && user === undefined) {
            const getUserAPI = ApiFactory.get("getUserInformation");
            getUserAPI(cookies.iusha)
                .then((res)=>{
                    setUser(res["user"]);
                });
        }
    });

    if( !("iusha" in cookies) || cookies.iusha == undefined) {
        return <Redirect to="/login" />
    }

    return (
        <Grid container className={classes.root}>
            <Grid item xs={2}>
                <Sidebar />
            </Grid>
            <Grid item xs={10} className={classes.page}>
                <Switch>
                    <Route path={`${match.path}/veinat`}>
                        <Neighborhood />
                    </Route>
                    <Route path={`${match.path}/comandes`}>
                        <Orders />
                    </Route>
                    <Route path={`${match.path}/compte`}>
                        <Profile />
                    </Route>
                    <Route path={`${match.path}/`}>
                        <ShopRouter />
                    </Route>
                </Switch>
            </Grid>
        </Grid>
    )
}


