import React from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { SearchBox, ListView, StoreCard } from "../../components";
import { TertiaryButton } from "../../shared-components";
import { NoInfoCard } from "../../components/Card/NoInfoCard";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'inherit'
    },
    item: {
        padding: theme.spacing(1)
    },
    searchBox: {
        padding: theme.spacing(1)
    },
    filter: {
        paddingTop: theme.spacing(2),
        '& > button': {
            margin: theme.spacing(1)
        }
    },
    listView: {
        padding: 0,
        paddingTop: theme.spacing(2) 
    }
}));

export function ShopSearch(props) {

    const classes = useStyles();

    const stores = props.stores;
    const buttons = ["OBERT ARA", "A DOMICILI", "PER RECOLLIR"];

    function handleFilterOnClick(e) {
        console.log("HOLA");
    }

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
                    image={stores[i]["image"]}
                />  
            </Grid>
            )
            output.push(
                aux
            )
        }

        if (output.length === 0) {
            output.push(<NoInfoCard information={"No hi ha cap comerç aprop teu"} />)
        }

        return (
            <ListView>
                {output}
            </ListView>
        )
    }

    return (
        <Grid container direction="row" alignItems="center">
            <Grid item lg={12} className={classes.item}>
                <Typography variant="h1">
                    Què necessites comprar?
                </Typography>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.searchBox}>
                <SearchBox
                    label="Cercar per nom"
                />
            </Grid>
            <Grid item lg={12} className={classes.filter}>
                <TertiaryButton>
                    <Typography variant="subtitle2">
                        Categoria
                    </Typography>
                </TertiaryButton>

                {
                    buttons.map(item => 
                        <TertiaryButton key={item} onClick={(e) => handleFilterOnClick(e)}>
                            <Typography variant="subtitle2">
                                {item}
                            </Typography>
                        </TertiaryButton>
                    )
                }
            </Grid>
            <Grid item lg={12} className={classes.listView}>
                {renderRestaurants()}
            </Grid>
        </Grid>
    )
}
