import React from 'react';
import { Grid, Button, useTheme, makeStyles, Typography, Paper, Divider } from '@material-ui/core';
import { StoreContext } from '../../context/StoreContext';
import { ListView } from '../../components';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        marginRight: theme.spacing(5),
        padding: theme.spacing(2)
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(1),
        '& > p': {
            marginLeft: theme.spacing(2)
        }
    },
    item : {
    },
    horari: {
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(1),
        '& > div': {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3)
        },
        '& > p': {
            marginLeft: theme.spacing(2)
        }
    },
    horariItem : {
        flexWrap: 'nowrap'
    },
    day: {
        marginRight: theme.spacing(2),
        textAlign: 'right'
    },
    time: {
        textAlign: 'left'
    }

}));

export function StoreInformation() {
    const { storeInfo, setStoreInfo } = React.useContext(StoreContext);
    const classes = useStyles();


    function renderHorari() {
        const horari =  storeInfo["openning_hours"];
        const traduccio = {
            'monday': 'Dilluns',
            'tuesday': 'Dimarts',
            'wednesday': 'Dimecres',
            'thursday': 'Dijous',
            'friday': 'Divendres',
            'saturday': 'Dissabte',
            'sunday': 'Diumenge'
        }
        var days  = [];
        var j = 0;
        for (var i in traduccio) {
                days.push(
                    <Grid item xs={6}>
                        <Typography variant="subtitle2" className={classes.time}>
                            {traduccio[i]}
                        </Typography>
                    </Grid>
                )
                days.push(
                    <Grid item xs={6}>
                    <Typography variant="subtitle2" className={classes.time}>
                        {horari[j]}
                    </Typography>
                    </Grid>
                )
                days.push(
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                )
                j += 1;
        }

        return (
            <Grid container direction="row" className={classes.horari}>
                {days}
            </Grid>
        );
    }

    return (
        <Paper square className={classes.root}>
            <Grid container
            direction="column"
        >   
            <Grid item>
                <div className={classes.line}>
                    <Typography variant="subtitle1" color="primary">
                        <b>Direcció:</b>
                    </Typography>
                    <Typography variant="body1">
                        {storeInfo["postal_address"]}
                    </Typography>

                </div>
                { storeInfo["website"] &&
                <div className={classes.line}>
                    <Typography variant="subtitle1"  color="primary">
                        <b>Web:</b>
                    </Typography>
                    <Typography variant="body1">
                        {storeInfo["website"]}
                    </Typography>
                </div>
                }
                { storeInfo["phone_number"] &&
                <div className={classes.line}>
                    <Typography variant="subtitle1"  color="primary">
                        <b>Contacte:</b>
                    </Typography>
                    <Typography variant="body1">
                        {storeInfo["phone_number"]}
                    </Typography>
                </div>
                }
            </Grid>

            <Grid item className={classes.item}>
                <div className={classes.horari}>
                    <Typography variant="subtitle1" color="primary">
                        <b>Horari:</b>
                    </Typography>
                    {renderHorari()}
                </div>
            </Grid>
        </Grid>
        </Paper>
    )
}