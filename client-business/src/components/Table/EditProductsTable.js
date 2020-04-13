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
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { IconButton } from "@material-ui/core";

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
    const [init, setInit] = React.useState();
    const [products, setProduts] = React.useState([]);

    React.useEffect(() => {
        let aproducts = [...products];
        for (var i in props.products) {
            var aux = props.products[i];
            aux["edit"] = false;
            aproducts.push(aux);
        }
        setProduts(aproducts);
    }, [init]);


    function renderItems() {
        var output = [];
        for (var i in products) {
            var edit = products[i].edit
            output.push(
                <StyledTableRow key={products[i].name}>
                    <StyledTableCell component="th" scope="row">
                        {products[i].name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                        <TextField value={products[i].description}></TextField>

                    </StyledTableCell>
                    <StyledTableCell align="right">{products[i].product_group_id}</StyledTableCell>
                    <StyledTableCell align="right">{products[i].price_type}</StyledTableCell>
                    <StyledTableCell align="right">{products[i].price}</StyledTableCell>
                    {
                        edit ?
                            <StyledTableCell align="right">
                                <IconButton>
                                    <CancelIcon /> <SaveAltIcon />
                                </IconButton>
                            </StyledTableCell> :
                            <StyledTableCell align="right">
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </StyledTableCell>
                    }
                </StyledTableRow>
            )
        }
        return output;
    }

    return (
        <div className={classes.root}>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell><b>Producte</b></StyledTableCell>
                            <StyledTableCell><b>Descripció</b></StyledTableCell>
                            <StyledTableCell align="right"><b>Categoria</b></StyledTableCell>
                            <StyledTableCell align="right"><b>Unitat</b></StyledTableCell>
                            <StyledTableCell align="right"><b>Preu / Unitat</b></StyledTableCell>
                            <StyledTableCell align="right"><b>Actions</b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderItems()}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}