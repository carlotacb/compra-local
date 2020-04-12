import React from 'react';
import { Typography, makeStyles } from "@material-ui/core";
import { Tag } from "../../shared-components/Tag/Tag";
import { StoreContext } from '../../context';
import { Stars } from '../../shared-components';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.light,
        padding: theme.spacing(2)
    },
    tags: {
        display: 'flex',
        '& > div': {
            margin: theme.spacing(0.5)
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
                <Tag>
                    {storeInfo['tags'][i]}
                </Tag>
            );
        }
        return output;
    }

    return (
        <div className={classes.root}>
            <Stars value={storeInfo['punctuation']} />
            <Typography variant="h2"> {storeInfo['name']} </Typography>
            <div className={classes.tags}>
                {renderTags()}
            </div>
        </div>
    )
}