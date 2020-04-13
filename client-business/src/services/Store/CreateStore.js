import { urlProd } from '../ApiFactory';
import {updateHoursInformation} from './UpdateStore'
const axios = require('axios');


export function createStoreInformation(userId, storeInfo) {
    const endpoint = '/admin'
    var numT = parseInt(storeInfo["phone_number"]);
    var website = "";
    if(storeInfo["website"]) {
        website = toString(storeInfo["website"]);
    }
    var data = {
        delivery: storeInfo["delivery"],
        description: storeInfo["description"],
        name: storeInfo["name"],
        phone_number: numT,
        postal_address: storeInfo["postal_address"],
        website: website,
        pick_up: true,
        user_id: userId
    }
    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'post',
                url: urlProd + endpoint,
                data: data,
            }).then(function (response) {
                if (response.data['error'] ) {
                    resolve({
                        error: true,
                        message: "not updated"
                    });
                }
                else {
                    storeInfo["id"] = response.data["response"].local_id;
                    updateHoursInformation(storeInfo)
                        .then((res) => {
                            if (res["error"]) {
                                resolve({
                                    error: true
                                });
                            }
                            else {
                                resolve({
                                    error: false
                                });
                            }
                        });
                }

            })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.log(error);
        }
    });
}