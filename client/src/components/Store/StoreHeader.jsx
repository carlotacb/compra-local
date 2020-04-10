import React from 'react';
import { Grid, Typography } from "@material-ui/core";
import { Tag } from "../../shared-components/Tag/Tag";
import { StoreContext } from '../../context';

export function StoreHeader(props) {
    const { storeInfo, setStoreInfo } = React.useContext(StoreContext);

    return (
        <div>
            <Typography variant="h2">SHOP LOCAL {storeInfo} </Typography>
            <div>
                <Tag>
                    Obert ara
                        </Tag>
                <Tag>
                    A domicili
                        </Tag>
                <Tag>
                    Per recollir
                        </Tag>
            </div>
        </div>
    )
}