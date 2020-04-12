import React, { useState, useContext } from "react";
import { Grid } from "@material-ui/core";
import { GroupButton } from '../../shared-components/';
import { ProcessPickUp, NeedHelp } from '../../views';
import { ApiFactory } from "../../services/ApiFactory";
import { UserContext } from '../../context/UserContext';
import { Loading } from "../../components/Loading/Loading";

export function Neighborhood() {
    const { user } = useContext(UserContext);
    const [ page, setPage ] = useState(0);
    const [ progressHelp, setProgressHelp ] = useState([]);
    const [ needHelp, setNeedHelp ] = useState([]);

    const changePage = (p) => {
        setPage(p)
    }

    React.useEffect(function getRecivedValorations() {
        if(user === undefined) return;
        if(user["id"] === undefined) return;

        const currentHelpingAPI = ApiFactory.get('getProcesHelper');
        currentHelpingAPI(user["id"]).then((res) => {
            setProgressHelp(res.list);
        })

        const getNeedHelpAPI = ApiFactory.get('getNeedHelp');
        getNeedHelpAPI(user["latitude"], user["longitude"]).then((res) => {
            setNeedHelp(res.list);
        });
        
    }, [user]);

    if(user === undefined) {
        return <Loading />
    }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item>
                <GroupButton buttons={["Recollida en procés", "Peticions de recollida"]} active={page} onClick={(p) => changePage(p)} />
                {(page === 0) ? <ProcessPickUp information={progressHelp}/> : <NeedHelp information={needHelp} />}
            </Grid>
        </Grid>
    )
}

