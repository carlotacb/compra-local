import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { StoreContext } from '../../../context';

export function PurchaseSelect(props) {
    const {storeInfo, setStoreInfo} = React.useContext(StoreContext);
    const handleChange = (event) => {
        props.setValue(event.target.value);
    };


    // Check if store allow delivery
    var delivery_disabled = true;
    if (storeInfo["allow_delivery"]) {
        delivery_disabled = false;
    }

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Selecciona el mètode de recollida</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={props.value} onChange={handleChange}>
                <FormControlLabel value="PICK_UP" control={<Radio />} label="Recollir a la botiga" />
                <FormControlLabel value="DELIVER" disabled={delivery_disabled} control={<Radio />} label="Enviat per la botiga" />
                <FormControlLabel value="HELPER_NEEDED" control={<Radio />} label="Necessito un/a voluntari/a" />
            </RadioGroup>
        </FormControl>
    );
}