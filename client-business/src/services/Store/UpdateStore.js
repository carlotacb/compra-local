import { urlProd } from '../ApiFactory';
const axios = require('axios');


export function updateStoreInformation(storeInfo) {
    const endpoint = '/admin/' +  storeInfo["id"];
    var numT = parseInt(storeInfo["phone_number"]);
    var website = toString(storeInfo["website"]);
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


export function updateHoursInformation(storeInfo) {
    const endpoint = '/admin/' + storeInfo["id"] + '/openingHours';

    return new Promise((resolve, reject) => {
        const days = {
            "MONDAY": ["hmoni", "hmonf"],
            "TUESDAY": ["htuei", "htuef"],
            "WEDNESDAY": ["hwedi", "hwedf"],
            "THURSDAY": ["hthui", "hthuf"],
            "FRIDAY": ["hfrii", "hfri"],
            "SATURDAY": ["hsati", "hsatf"],
            "SUNDAY": ["hsuni", "hsunf"]
        }

        var hours = [];
        for (var i in days) {
            hours.push({
                ended_at: storeInfo[days[i][0]],
                started_at: storeInfo[days[i][1]],
                week_day: i
            });
        }


        try {
            axios({
                method: 'put',
                url: urlProd + endpoint,
                data: hours
            }).then(function (response) {
                if (response.data['error']) {
                    resolve({
                        error: true,
                        message: response.data['message']
                    });
                }
                else {
                    resolve({
                        error: false
                    });
                }
            })
                .catch((error) => {
                    console.error(error);
                });
        }
        catch (error) {
            console.log(error);
        }
    });
}