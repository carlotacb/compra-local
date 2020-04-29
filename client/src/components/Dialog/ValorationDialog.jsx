import React from 'react';
import { AcceptConfirmDialog } from './AcceptConfirmDialog';
import {
    TextField,
    Typography,
    Grid,
    makeStyles
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    body : {
        marginTop: theme.spacing(2)
    },
    textField: {
        '& > div': {
            borderRadius: 0
        }
    }
}));


export function ValorationDialog(props) {
    const classes = useStyles();
    const [rateValue, setRateValue] = React.useState(2.5);
    const [comment, setComment] = React.useState();

    function handleAccept() {
        props.onAccept(rateValue, comment);
        setComment('');
        //TODO: Call api
    }

    return (
        <AcceptConfirmDialog
            open={props.open}
            title="Valorar l'experència"
            onAccept={() => handleAccept()}
            onClose={props.onClose}>
            <Typography variant="body1">
                {
                    props.type == "BUSINESS" ?
                        "Explica'ns com ha anat el procés de compra amb l'establiment " :
                        "Explican'ns com ha anat el procés d'enviament amb el/la voluntari/a "
                }
                <b>{props.name}</b> !
                </Typography>
            <Grid container className={classes.body} justify="space-between">
                <Grid item lg={8} md={12}>
                    <Typography component="legend">Fés el teu comentari</Typography>
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={comment}
                        onChange={(event, newValue) => {
                            setComment(newValue);
                        }}
                    />
                </Grid>
                <Grid item lg={3} md={12}>
                    <Typography component="legend">Valoració general</Typography>
                    <Rating
                        name="simple-controlled"
                        value={rateValue}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setRateValue(newValue);
                        }}
                    />
                </Grid>

            </Grid>
        </AcceptConfirmDialog>
    )
}