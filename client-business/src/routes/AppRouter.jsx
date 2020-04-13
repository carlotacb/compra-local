import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { Sidebar } from '../components';

import { Grid, makeStyles } from '@material-ui/core';
import { Profile, Orders } from '../views';

import { UserContext, PathContext   } from '../context';
import { ApiFactory } from '../services/ApiFactory';
import { StoreContext } from '../context/StoreContext';
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
    const [cookies, setCookie] = useCookies(['iusha-bs']);
    const [userI, setUserI] = React.useState(0)
    const classes = useStyles();
    const { user, setUser } = React.useContext(UserContext);
    const { store, setStore } = React.useContext(StoreContext);

    const { path, setPath } = React.useContext(PathContext);

    const [small, setSmall] = React.useState();

    function handleChangePage(e) {
        setCookie("path", e.currentTarget.pathname, { path: "/" });
    }


    React.useEffect(() => {
        if ("iusha-bs" in cookies && user === undefined) {
            const getUserAPI = ApiFactory.get("getUserInformation");
            getUserAPI(cookies["iusha-bs"])
                .then((res) => {
                    setUser(res["user"]);
                    if ("local_id" in res["user"] && res["user"]["local_id"] != null) {
                        const getStoreInfomationAPI = ApiFactory.get("getStoreInfomation");
                        getStoreInfomationAPI(res["user"]["local_id"])
                            .then((res) => {
                                console.log(res);
                                setStore(res["store"])
                            });
                    }
                });

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
        }
    }, [userI]);

    if (!("iusha-bs" in cookies) || cookies["iusha-bs"] == undefined) {
        return <Redirect to="/login" />
    }

    function renderRouter() {
        return (

            <Switch>
                <Route path={`${match.path}/botiga`}>
                    <Profile />
                </Route>
                <Route exact path={`${match.path}/`}>
                    <Orders />
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
            <Grid item xs={2}>
                <Sidebar path={path} onClick={(e) => handleChangePage(e)} />
            </Grid>
            <Grid item xs={10} className={classes.page}>
                {renderRouter()}
            </Grid>
        </Grid>)
    }
}


