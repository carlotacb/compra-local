import React from 'react';
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import { UserContext, CompanyEditContext, StoreContext } from '../context';
import { Login, Register } from '../views';
import { AppRouter } from './index';

export function BaseRouter() {


    const [companyEdit, setComanyEdit] = React.useState(false);
    const companyProviderValue = React.useMemo(() => ({ companyEdit, setComanyEdit }), [companyEdit, setComanyEdit]);

    const [user, setUser] = React.useState(undefined);
    const providerValue = React.useMemo(() => ({ user, setUser }), [user, setUser]);
    const [store, setStore] = React.useState({
        id: "",
        name: "",
        postal_address: "",
        phone_number: "",
        website: "",
        hmoni: "",
        hmonf: "",
        htuei: "",
        htuef: "",
        hwedi: "",
        hwedf: "",
        hthui: "",
        hthuf: "",
        hfrii: "",
        hfrif: "",
        hsati: "",
        hsatf: "",
        hsuni: "",
        hsunf: "",
    });
    const storeProviderValue = React.useMemo(() => ({ store, setStore }), [store, setStore]);
    return (
        <Router>
            <UserContext.Provider value={providerValue}>
                <CompanyEditContext.Provider value={companyProviderValue}>
                    <StoreContext.Provider value={storeProviderValue}>
                    <Route exact path="/">
                        <p>e</p>
                        {/*TODO: Decide where to redirect*/}
                    </Route>
                    <Route path="/in">
                        <AppRouter />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/registre">
                        <Register />
                    </Route>
                    </StoreContext.Provider>
                </CompanyEditContext.Provider>
            </UserContext.Provider>
        </Router>
    )
}