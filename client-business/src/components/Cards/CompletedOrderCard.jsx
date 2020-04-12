import React from 'react';
import { Grid, Paper, Typography, makeStyles, Button, Avatar } from '@material-ui/core';
import { TicketDialog } from '../Dialog/TicketDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        marginBottom:theme.spacing(3),
        padding: theme.spacing(2),
        backgroundColor: '#F9F9F9'
    },
    buttons: {
        display: 'flex',
	    flexDirection: 'column',
	    justifyContent: 'space-between',
        paddingLeft: '1.5em'
    },
    information: {
        display: 'flex',
        flexDirection: 'column', 
    },
    outlinedTag: {
        ...theme.typography.button,
        border: '1px solid rgb(151, 119, 181);',
        padding: theme.spacing(0.5),
        marginTop: theme.spacing(1),
        textAlign: 'center'
    },
    client: {
        display: 'flex',
	    flexDirection: 'row',      
	    alignItems: 'center',
	    alignContent: 'center'
    },
    marginTop: {
        marginTop: theme.spacing(1)
    },
    marginLeft: {
        marginLeft: theme.spacing(1)
    }
}));

export function CompletedOrderCard(props) {
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);

    return (
        <Paper className={classes.root}>
            <Grid container direction="row">
                <Grid item xs={8} className={classes.information}>
                    <Grid item className={classes.client}>
                        <Avatar className={classes.avatarSize} src={'data:image/png;base64,'+ props.client.image}/>
                        <Typography variant="h5" className={classes.marginLeft}> {props.client.name} </Typography>
                    </Grid>
                    <Typography variant="h6" className={classes.marginTop}> Total comanda: {props.total} € </Typography>
                </Grid>
                <Grid item xs={4} className={classes.buttons}>
                    <Typography variant="h1" align="right">#{props.orderID}</Typography>
                    <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}> VEURE TIQUET </Button>
                </Grid>
            </Grid>
            <TicketDialog open={openModal} onClose={() => setOpenModal(false)} ticket={props.ticket} title={'TIQUET'}/>
        </Paper>
    )
}