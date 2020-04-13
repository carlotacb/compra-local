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
import { ApiFactory } from '../../services/ApiFactory';
import {UserContext} from '../../context/';
import { NoDelete } from '../Dialog/NoDelete';
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
    textField: {
        marginTop: 0,
        paddingTop: 0,
        '& > div': {
            borderRadius: '0',
            backgroundColor: 'white'
        }
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
    const { user, setUser } = React.useContext(UserContext);
    const [error, setError] = React.useState(false);
    React.useEffect(() => {
        let aproducts = [...products];
        for (var i in props.products) {
            var aux = props.products[i];
            aux["edit"] = false;
            aproducts.push(aux);
        }
        setProduts(aproducts);
    }, [props.products]);

    function handleChange(e) {
        var id = e.currentTarget.id;
        var tags = id.split('-');
        var i = parseInt(tags[1]);
        var value = e.currentTarget.value;
        let aProducts = [...products];
        aProducts[i][tags[0]] = value;
        setProduts(aProducts);
    }


    function handleSave(e) {
        var id = e.currentTarget.id;
        //Call api
        const updateProduct = ApiFactory.get('updateProducts');
        updateProduct(user["local_id"], products[id])
            .then((res)=>{
                let aProducts = [...products];
                aProducts[id].edit = false;
                setProduts(aProducts);
            });
    }


    function handleDelete(e) {
        var id = parseInt(e.currentTarget.id);
        
        const deleteProductAPI = ApiFactory.get('deleteProduct');
        deleteProductAPI(user["local_id"], products[id]["id"])
            .then((res)=> {
                let aProducts = [...products];
                if(res["error"]) {
                    setError(true);
                    aProducts[id].edit = false;
                }
                else {
                    aProducts.splice(id, 1);
                }
                setProduts(aProducts);
            })
    }
    function handleEdit(e) {
        var i = parseInt(e.currentTarget.id);
        let aProducts = [...products];
        aProducts[i].edit = true;
        setProduts(aProducts);
    }


    function handleClose() {
        setError(false);
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
                            <TextField value={products[i].name}
                                variant="outlined"
                                id={"name-" + i}
                                onChange={handleChange}
                                className={classes.textField}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            <TextField value={products[i].description}
                                variant="outlined"
                                multiline
                                rows={4}
                                id={"description-" + i}
                                onChange={handleChange}
                                className={classes.textField}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <TextField
                                variant="outlined"
                                type="text"
                                value={products[i].product_group_id}
                                id={"product_group_id-" + i}
                                key={i}
                                onChange={handleChange}
                                className={classes.textField}
                                InputProps={{
                                    classes: {
                                        input: classes.normal
                                    }
                                }}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <TextField
                                variant="outlined"
                                value={products[i].price_type}
                                id={"price_type-" + i}
                                key={i}
                                onChange={handleChange}
                                className={classes.textField}
                                InputProps={{
                                    classes: {
                                        input: classes.small
                                    }
                                }}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <TextField type="number" value={products[i].price}
                            variant="outlined"
                                id={"price-" + i}
                                key={i}
                                onChange={handleChange}
                                className={classes.textField}
                                InputProps={{
                                    classes: {
                                        input: classes.small
                                    }
                                }}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <div className={classes.inline}>
                                <IconButton size="small" id={id} onClick={(e) => handleSave(e)}>
                                    <SaveAltIcon />
                                </IconButton>
                                <IconButton size="small" id={id} onClick={(e) => handleDelete(e)}>
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
                            <IconButton id={id} onClick={(e) => handleEdit(e)}>
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
            {
                error &&
                <NoDelete open={error} onClick={handleClose} />
            }
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