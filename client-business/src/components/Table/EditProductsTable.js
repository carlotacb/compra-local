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
import DeleteIcon from '@material-ui/icons/Delete';
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
    icon: {
        margin: 0,
        padding: 0
    },
    inline: {
        display: 'inline-flex'
    },
    small: {
        maxWidth: '5em',
        textAlign: 'right'
    },
    normal: {
        textAlign: 'right'
    }
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
    },[props.products]);


    function handleCancel(e) {
        var i = parseInt(e.currentTarget.id);
        let aProducts = [...products];
        aProducts[i].edit = false;
        setProduts(aProducts);
    }

    function handleSave(e) {
        var i = parseInt(e.currentTarget.id);
        let aProducts = [...products];
        aProducts[i].edit = false;
        setProduts(aProducts);
    }


    function handleDelete(e){
        var i = parseInt(e.currentTarget.id);
        let aProducts = [...products];
    }
    function handleEdit(e) {
        var i = parseInt(e.currentTarget.id);
        let aProducts = [...products];
        aProducts[i].edit = true;
        setProduts(aProducts);
    }

    function renderItems() {
        var output = [];
        for (var i in products) {
            var edit = products[i].edit
            var id = i;
            if (edit) {
                output.push(
                    <StyledTableRow key={products[i].name} >
                        <StyledTableCell component="th" scope="row">
                        <TextField value={products[i].name}/>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            <TextField value={products[i].description}
                                        multiline
                                        rows={4}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <TextField 
                                type="text"
                                value={products[i].product_group_id}
                                InputProps={{
                                    classes: {
                                        input: classes.normal
                                    }
                                }}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                        <TextField 
                            value={products[i].price_type}
                            InputProps={{
                                classes: {
                                    input: classes.small
                                }
                            }}
                        />
                            </StyledTableCell>
                        <StyledTableCell align="right">
                            <TextField type="number" value={products[i].price}
                                InputProps={{
                                    classes: {
                                        input: classes.small
                                    }
                                }}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <div className={classes.inline}>
                                <IconButton size="small" 
                                            id={id} 
                                            className={classes.icon}
                                            onClick={(e)=>handleCancel(e)}>
                                    <CancelIcon />
                                </IconButton>
                                <IconButton size="small"  id={id} onClick={(e) =>handleSave(e)}>
                                    <SaveAltIcon />
                                </IconButton>
                                <IconButton size="small"  id={id} onClick={(e) =>handleDelete(e)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </StyledTableCell> 
                    </StyledTableRow>
                )
            }
            else {

                output.push(
                    <StyledTableRow key={products[i].name}>
                        <StyledTableCell component="th" scope="row">
                            {products[i].name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            {products[i].description}
                        </StyledTableCell>
                        <StyledTableCell align="right">{products[i].product_group_id}</StyledTableCell>
                        <StyledTableCell align="right">{products[i].price_type}</StyledTableCell>
                        <StyledTableCell align="right">{products[i].price}</StyledTableCell>
                        <StyledTableCell align="right">
                            <IconButton id={id} onClick={(e)=>handleEdit(e)}>
                                <EditIcon />
                            </IconButton>
                        </StyledTableCell>
                    </StyledTableRow>
                )
            }
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