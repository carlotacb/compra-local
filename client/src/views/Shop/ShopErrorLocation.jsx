import React from "react";
import { SpanAlert } from '../../shared-components';
import { Typography, Grid, makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        width: 'inherit'
    },
}));

export function ShopErrorLocation() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <SpanAlert message="warning">
                <Grid container direction="row" alignItems="center" wrap="noWrap" >
                    <Grid item>
                        <Typography variant="h1">
                            EPS!
                    </Typography>
                    </Grid>
                    <Grid item>
                        <Typography noWrap variant="h4">
                            Necessixtem la teva localització per poder mostrar-te els comerços més propers.
                        </Typography>
                    </Grid>
                </Grid>
            </SpanAlert>
        </div>
    )
}
