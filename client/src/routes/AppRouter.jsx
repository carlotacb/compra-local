import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { ShopRouter } from './ShopRouter';
import { Sidebar } from '../components/';

import { Grid, makeStyles } from '@material-ui/core';
import { Profile, Neighborhood, Orders } from '../views';


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
    const classes = useStyles();
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


