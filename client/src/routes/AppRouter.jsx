import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { ShopRouter } from './ShopRouter';
import { Sidebar } from '../components/';

import { Grid, makeStyles, Button } from '@material-ui/core';
import { Profile, Neighborhood, Orders } from '../views';

import { UserContext, PathContext } from '../context';
import { ApiFactory } from '../services/ApiFactory';
import { SmallSidebar } from '../components/Sidebar/SmallSidebar';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'inherit'
    },
    page: {
        padding: theme.spacing(7)
    },
    buttonMenu: {
        position: 'absolute'
    }
}));


export function AppRouter() {

    let match = useRouteMatch();
    const [cookies, setCookie] = useCookies();
    const classes = useStyles();
    const { user, setUser } = React.useContext(UserContext);
    const { path, setPath } = React.useContext(PathContext);

    const [small, setSmall] = React.useState();

    React.useEffect(() => {
        if ("iusha" in cookies && user === undefined) {
            const getUserAPI = ApiFactory.get("getUserInformation");
            getUserAPI(cookies.iusha)
                .then((res) => {
                    setUser(res["user"]);
                });
        }
        if ("path" in cookies) {
            setPath(cookies["path"]);
        }
        else {
            setPath("/in/");
        }
        let mobile = (window.innerWidth <= 760);
        if (mobile) {
            setSmall(true);
        }
        else {
            setSmall(false);
        }
    }, [user]);

    if (!("iusha" in cookies) || cookies.iusha == undefined) {
        return <Redirect to="/login" />
    }

    function handleChangePage(e) {
        setCookie("path", e.currentTarget.pathname, { path: "/" });
    }


    function renderRouter() {
        return (
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
        )
    }

    if (small) {
        return (
            <Grid container className={classes.root}>
                <div className={classes.buttonMenu}>
                    <SmallSidebar />
                </div>
                <Grid item xs={12} className={classes.page}>
                    {renderRouter()}
                </Grid>
            </Grid>
        )
    }
    else {
        return (<Grid container className={classes.root}>
            <Grid item lg={2} md={3} sm={4} xs={0}>
                <Sidebar path={path} onClick={(e) => handleChangePage(e)} />
            </Grid>
            <Grid item lg={10} md={8} sm={8} xs={12}className={classes.page}>
                {renderRouter()}
            </Grid>
        </Grid>)
    }
}


