import React from "react";
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";
import { StoreEdit } from "./StoreEdit";
import { StoreInfo } from "./StoreInfo";

export function StoreProfile(props) {
    const [edit, setEdit] = React.useState(props.edit);
    if(edit) {
        return (
            <StoreEdit />
        )
    }
    else {
        return (
            <StoreInfo />
        )
    }
}