import React from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { SearchBox, ListView, StoreCard } from "../../components";
import { TertiaryButton } from "../../shared-components";


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

export function ShopSearch() {

    const classes = useStyles();

    function renderRestaurants() {
        // TODO: Loop from API
        return (
            <ListView maxHeight={100}>
                <Grid item>
                    <StoreCard
                        id={1}
                        name="Bona Fruita Sants"
                        description="Fruteria de tota la vida que incentiva el producte de proximitat. Demana la teva cistella per a la setmana."
                        category="Fruteria"
                        stars={4.5}
                        tags={["Obert ara", "A domicili", "A recollir"]}
                    />
                </Grid>
                <Grid item>
                    <StoreCard
                        id={2}
                        name="Bona Fruita Sants"
                        description="Fruteria de tota la vida que incentiva el producte de proximitat. Demana la teva cistella per a la setmana."
                        category="Panaderia"
                        stars={2}
                        tags={["Obert ara", "A recollir"]}
                    />
                </Grid>
                <Grid item>
                    <StoreCard
                        id={3}
                        name="Bona Fruita Sants"
                        description="Fruteria de tota la vida que incentiva el producte de proximitat. Demana la teva cistella per a la setmana."
                        category="Fruteria"
                        stars={4.5}
                        tags={["Obert ara", "A domicili", "A recollir"]}
                    />
                </Grid>
                <Grid item>
                    <StoreCard
                        id={4}
                        name="Bona Fruita Sants"
                        description="Fruteria de tota la vida que incentiva el producte de proximitat. Demana la teva cistella per a la setmana."
                        category="Panaderia"
                        stars={2}
                        tags={["Obert ara", "A recollir"]}
                    />
                </Grid>
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
