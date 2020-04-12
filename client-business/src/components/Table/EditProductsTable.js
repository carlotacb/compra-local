import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
    root: {
        '& > div': {
            borderRadius: 0
        }
    },
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export function EditProductsTable(props) {
    const classes = useStyles();

    const rows = props.products;

    return (
        <div  className={classes.root}>
            
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell><b>Producte</b></StyledTableCell>
                        <StyledTableCell><b>Descripció</b></StyledTableCell>
                        <StyledTableCell align="right"><b>Categoria</b></StyledTableCell>
                        <StyledTableCell align="right"><b>Unitat</b></StyledTableCell>
                        <StyledTableCell align="right"><b>Preu / Unitat</b></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <TextField value={row.description}></TextField>

                            </StyledTableCell>
                            <StyledTableCell align="right">{row.product_group_id}</StyledTableCell>
                            <StyledTableCell align="right">{row.price_type}</StyledTableCell>
                            <StyledTableCell align="right">{row.price}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}