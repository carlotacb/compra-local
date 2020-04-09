import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { ShopRouter } from './ShopRouter';
import { Sidebar } from '../components/';

import { Grid, makeStyles } from '@material-ui/core';


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
                        <p>veinat</p>
                    </Route>
                    <Route path={`${match.path}/comandes`}>
                        <p>comandes</p>
                    </Route>
                    <Route path={`${match.path}/perfil`}>
                        <p>perfil</p>
                    </Route>
                    <Route path={`${match.path}/`}>
                        <ShopRouter />
                    </Route>
                </Switch>
            </Grid>
        </Grid>
    )
}


