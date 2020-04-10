import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Tag } from "../../shared-components/Tag/Tag";

export function ShopStore() {
    return (
        <Grid container direction="column">
            <Grid item>
                <header>
                    <Typography variant="h2">SHOP LOCAL</Typography>
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
                </header>
            </Grid> 
        </Grid>
    )
}
