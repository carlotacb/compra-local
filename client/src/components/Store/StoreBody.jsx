import React from 'react';
import { Grid, Button, useTheme, makeStyles, Typography } from '@material-ui/core';
import { StoreContext } from '../../context/StoreContext';
import { StoreInformation } from './StoreInformation';
import { ListView } from '../Listview/ListView';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        margin: theme.spacing(1)
    },
}));



function StoreBodyMenu(props) {
    const classes = useStyles();
    function handleClick(e) {
        const page = e.currentTarget.id;
        if(props.onClick){
            props.onClick(parseInt(page))
        }
    }
    const theme = useTheme();
    const active = props.active;

    const basicS= {
        borderRadius: 0,
        borderBottom: `3px solid white`
    }
    var style = [basicS,basicS];
    style[active] = {
        borderRadius: 0,
        borderBottom: `3px solid ${theme.palette.primary.main}`
    }

    return (
        <div className={classes.root}>
            <Button 
                id={0} 
                onClick={(e) => handleClick(e)}
                style
                style={style[0]}
            >
                Productes
            </Button>
            <Button 
                id={1} 
                onClick={(e) => handleClick(e)}
                style={style[1]}
            >
                Informació
            </Button>
        </div>
    )
}


function StoreProductes() {
    const { storeInfo, setStoreInfo } = React.useContext(StoreContext);

    return (
        <p> Productes</p>
    )
}


export function StoreBody(props) {
    const [page, setPage] = React.useState(0);


    function renderPage() {
        if(page == 0) {
            //Productes
            return <p>Productes</p>
        }
        else if (page == 1) {
            return <StoreInformation />
        }
    }
    return (
        <Grid>
            <Grid item>
                <StoreBodyMenu active={page} onClick={(p) => setPage(p)}/>
            </Grid>
            <Grid item>
                <Grid container>
                    <Grid item xs={7}>
                        {renderPage()}
                    </Grid>
                    <Grid item>
                        <ListView>
                            <Typography variant="h3">
                                La teva compra
                            </Typography>
                        </ListView>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}