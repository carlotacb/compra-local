import { urlProd } from '../ApiFactory';
import {updateHoursInformation} from './UpdateStore'
const axios = require('axios');


export function createStoreInformation(storeInfo) {
    const endpoint = '/admin/' +  storeInfo["id"];
    var numT = parseInt(storeInfo["phone_number"]);
    var website = toString(website);
    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'put',
                url: urlProd + endpoint,
                data: {
                    delivery: storeInfo["delivery"],
                    description: storeInfo["description"],
                    name: storeInfo["name"],
                    phone_number: numT,
                    postal_address: storeInfo["postal_address"],
                    website: website
                }
            }).then(function (response) {
                if (response.data['error'] || !response.data['response']['edited'] ) {
                    resolve({
                        error: true,
                        message: "not updated"
                    });
                }
                else {
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