import React from 'react';
import { Grid, Button, useTheme, makeStyles, Typography } from '@material-ui/core';
import { StoreContext } from '../../context/StoreContext';
import { ListView } from '../../components';

const useStyles = makeStyles((theme) => ({
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
        width: 'fit-content',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        '& > div': {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3)
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
        var days  = []
        for (var i in traduccio) {
                days.push(
                    <Typography variant="subtitle2" className={classes.time}>
                        {traduccio[i]}
                    </Typography>
                )
        }
        var hours = []
        for(var i in horari) {
            hours.push(
                    <Typography variant="subtitle2" className={classes.time}>
                        {horari[i]}
                    </Typography>
            )
        }
        return (
            <div className={classes.horari}>
                <div className={classes.day}>
                    {days}
                </div>
                <div className={classes.time}>
                    {hours}
                </div>
            </div>
        );
    }

    return (
        <Grid container
            direction="column"
        >
            <Grid item>
                <div className={classes.line}>
                    <Typography variant="subtitle1">
                        Direcció:
                    </Typography>
                    <Typography variant="body1">
                        {storeInfo["postal_address"]}
                    </Typography>

                </div>
                { storeInfo["website"] &&
                <div className={classes.line}>
                    <Typography variant="subtitle1">
                        Web:
                    </Typography>
                    <Typography variant="body1">
                        {storeInfo["website"]}
                    </Typography>
                </div>
                }
                { storeInfo["phone_number"] &&
                <div className={classes.line}>
                    <Typography variant="subtitle1">
                        Contacte:
                    </Typography>
                    <Typography variant="body1">
                        {storeInfo["phone_number"]}
                    </Typography>
                </div>
                }
            </Grid>

            <Grid item className={classes.item}>
                <div className={classes.horari}>
                    <ListView>
                        <Typography variant="subtitle2">
                            Horari
                        </Typography>
                        {renderHorari()}
                    </ListView>
                </div>
            </Grid>
        </Grid>
    )
}