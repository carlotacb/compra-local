import React from 'react';
import { Typography, makeStyles } from "@material-ui/core";
import { Tag } from "../../shared-components/Tag/Tag";
import { StoreContext } from '../../context';
import { Stars } from '../../shared-components';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2)
    },
    tags: {
        display: 'flex',
        textTransform: 'uppercase',
        '& > h6': {
            color: theme.palette.primary.dark,
            margin: theme.spacing(1)
        }
    }
}));

export function StoreHeader(props) {
    const { storeInfo, setStoreInfo } = React.useContext(StoreContext);
    const classes = useStyles();
    
    function renderTags() {

        var output = [];
        for (var i in storeInfo['tags']) {
            output.push(
                <Typography variant="subtitle2">
                    {storeInfo['tags'][i]}
                </Typography>
            );
        }
        return output;
    }

    return (
        <div className={classes.root}>
            <Stars value={storeInfo['punctuation']} />
            <Typography variant="h2" color="primary"> {storeInfo['name']} </Typography>
            <div className={classes.tags}>
                {renderTags()}
            </div>
        </div>
    )
}