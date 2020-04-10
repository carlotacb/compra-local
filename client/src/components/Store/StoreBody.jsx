import React from 'react';
import { Grid, Button, useTheme, makeStyles, Typography } from '@material-ui/core';
import { StoreContext } from '../../context/StoreContext';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        margin: theme.spacing(1)
    },
}));

const useStyles2 = makeStyles((theme) => ({
    line: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(1),
        '& > p': {
            marginLeft: theme.spacing(2)
        }
    }
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

function StoreInformation() {
    const { storeInfo, setStoreInfo } = React.useContext(StoreContext);
    const classes = useStyles2();
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
                <div className={classes.line}>
                    <Typography variant="subtitle1">
                        Web:
                    </Typography>
                    <Typography variant="body1">
                        {storeInfo["website"]}
                    </Typography>
                </div>
                <div className={classes.line}>
                    <Typography variant="subtitle1">
                    Contacte:
                    </Typography>
                    <Typography variant="body1">
                        {storeInfo["phone_number"]}
                    </Typography>
                </div>
            </Grid>
        </Grid> 
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
                {renderPage()}
            </Grid>
        </Grid>
    )
}