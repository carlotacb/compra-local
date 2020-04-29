import React from 'react';
import { Paper, Typography, Grid, makeStyles } from "@material-ui/core";
import { ValorationDialog, TicketDialog } from '..';
import { PrimaryButton } from '../../shared-components/Button/PrimaryButton';
import { SecondaryButton } from '../../shared-components';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        paddingTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        padding: theme.spacing(2),
        '& > button': {
            marginTop: theme.spacing(1)
        }
    },
    name: {
        color: theme.palette.primary.dark,
        fontWeight: 'bold'
    }
}));

export function RateOrder(props) {
    const [rateOpen, setRateOpen] = React.useState(false);
    const classes = useStyles();

    function handleOnClick(e) {
        const id = e.currentTarget.id;
        switch (id) {
            case "rate":
                setRateOpen(true);
                break;
        }
    }
    return (
        <Paper square className={classes.root}>
            <Grid container direction="row" justify="space-between">
                <Grid item>
                    <Typography variant="body">
                            <b>Explica'ns la teva experiència amb
                              {
                                  props.order.type == "BUSINESS" ?
                                  " l'establiment" :
                                  " el/la voluntari/a"
                              }

                            </b>
                    </Typography>
                    <Typography variant="h5" className={classes.name}>
                        {props.order.type == "BUSINESS" ?
                            props.order.local_name :
                            props.order.user_name
                        }
                    </Typography>
                    <Typography variant="subtitle2">
                       Els teus comentaris ajudaran als nostres futurs clients! 
                    </Typography>
                </Grid>
                <Grid item lg={3} sm={12} className={classes.buttons}>
                    <SecondaryButton id="rate" onClick={(e) => handleOnClick(e)}>
                        VALORAR
                    </SecondaryButton>

                </Grid>
            </Grid>
            <ValorationDialog 
                open={rateOpen} 
                onClose={() => setRateOpen(false)} 
                onAccept={() => setRateOpen(false)} 
                type={props.order.type}
                name={
                    props.order.type == "BUSINESS" ?
                    props.order.local_name :
                    props.order.user_name
                }
            />
        </Paper>
    )
}