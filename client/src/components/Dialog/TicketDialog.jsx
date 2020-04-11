import React from 'react';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper }  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    title: {
        fontWeight: 'bold',
    }
});
  
export function TicketDialog(props) {
    const classes = useStyles();
    const rows = props.ticket;

    const renderTicketTable = () => {
        return (<TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.title}>Producte</TableCell>
                        <TableCell className={classes.title} align="right">Quantitat</TableCell>
                        <TableCell className={classes.title} align="right">Preu</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.name}>
                        <TableCell component="th" scope="row"> {row.product_name} </TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.total_price}€</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>)
    }

    return (
        <Dialog fullWidth open={props.open} onClose={props.close} aria-labelledby="customized-dialog-title" >
        <DialogTitle id="customized-dialog-title"> {props.title} </DialogTitle>
        <DialogContent>
            {renderTicketTable()}
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={props.onClose} color="primary"> Tancar </Button>
        </DialogActions>
        </Dialog>
    );
}
