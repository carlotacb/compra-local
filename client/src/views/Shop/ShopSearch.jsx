import React from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { SearchBox, ListView, StoreCard } from "../../components";
import { TertiaryButton } from "../../shared-components";

import { ApiFactory } from "../../services/ApiFactory";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'inherit'
    },
    item: {
        padding: theme.spacing(1)
    },
    filter: {
        paddingTop: theme.spacing(2),
        '& > button': {
            margin: theme.spacing(1)
        }
    },
    listView: {
        paddingTop: theme.spacing(2)
    }
}));

export function ShopSearch(props) {

    const classes = useStyles();

    const stores = props.stores;

    function renderRestaurants() {
        var output = [];
        for (var i in stores) {
            var aux = (
                <Grid item key={i}>
                <StoreCard
                    id={stores[i]["id"]}
                    name={stores[i]["name"]}
                    description={stores[i]["description"]}
                    category={stores[i]["category"]}
                    stars={stores[i]["punctuation"]}
                    tags={stores[i]["tags"]}
                />  
            </Grid>
            )
            output.push(
                aux
            )
        }
        return (
            <ListView>
                {output}
            </ListView>
        )
    }

    return (
        <Grid container direction="column" justify="space-between">
            <Grid item className={classes.item}>
                <Typography variant="h1">
                    Què necessites comprar?
                </Typography>
            </Grid>
            <Grid item className={classes.item}>
                <SearchBox
                    label="Cercar per nom"
                />
            </Grid>
            <Grid item className={classes.filter}>
                <TertiaryButton>
                    Categoria
                </TertiaryButton>

                <TertiaryButton>
                    Obert ara
                </TertiaryButton>

                <TertiaryButton>
                    A domicili
                </TertiaryButton>

                <TertiaryButton>
                    Per recollir
                </TertiaryButton>
            </Grid>
            <Grid item className={classes.listView}>
                {renderRestaurants()}
            </Grid>
        </Grid>
    )
}
