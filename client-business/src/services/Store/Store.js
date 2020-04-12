import { urlProd } from '../ApiFactory';
const axios = require('axios');





export function getStoreInformation(idStore) {
    const endpoint = '/admin/' + idStore;

    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'get',
                url: urlProd + endpoint
            }).then(function (response) {
                if (response.data['error']) {
                    resolve({
                        error: true,
                        message: response.data['message']
                    });
                }
                else {
                    var store = response.data['response'].local;
                    getScheduleInformation(idStore)
                        .then((res) => {
                            if (res["error"]) {
                                resolve({
                                    error: true,
                                    message: res.data["message"]
                                });
                            }
                            else {
                                const opening_hours = res["opening_hours"];
                                for (var i in opening_hours) {
                                    switch (opening_hours[i]["week_day"]) {
                                        case ("MONDAY"):
                                            store["hmoni"] = opening_hours[i]["started_at"];
                                            store["hmonf"] = opening_hours[i]["ended_at"];
                                            break;
                                        case ("TUESDAY"):
                                            store["htuei"] = opening_hours[i]["started_at"];
                                            store["htuef"] = opening_hours[i]["ended_at"];
                                            break;
                                        case ("WEDNESDAY"):
                                            store["hwedi"] = opening_hours[i]["started_at"];
                                            store["hwedf"] = opening_hours[i]["ended_at"];
                                            break;
                                        case ("THURSDAY"):
                                            store["hthui"] = opening_hours[i]["started_at"];
                                            store["hthuf"] = opening_hours[i]["ended_at"];
                                            break;
                                        case ("FRIDAY"):
                                            store["hfrii"] = opening_hours[i]["started_at"];
                                            store["hfrif"] = opening_hours[i]["ended_at"];
                                            break;
                                        case ("SATURDAY"):
                                            store["hsati"] = opening_hours[i]["started_at"];
                                            store["hsatf"] = opening_hours[i]["ended_at"];
                                            break;
                                        case ("SUNDAY"):
                                            store["hsuni"] = opening_hours[i]["started_at"];
                                            store["hsunf"] = opening_hours[i]["ended_at"];
                                            break;
                                    }
                                }

                                resolve({
                                    error: false,
                                    store: store
                                });
                            }
                        })
                        .catch((error) => {
                            resolve({
                                error: true,
                                message: error.message
                            });
                        });
                }
            })
                .catch((err) => {
                    resolve({
                        error: true,
                        message: err.message
                    });
                });
        } catch (error) {
            console.log(error);
        }
    });
}



export function getScheduleInformation(idStore) {
    const endpoint = '/admin/' + idStore + '/openingHours';
    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'get',
                url: urlProd + endpoint
            }).then(function (response) {
                if (response.data['error']) {
                    resolve({
                        error: true,
                        message: response.data['message']
                    });
                }
                else {
                    resolve({
                        error: false,
                        opening_hours: response.data.response['opening_hours']
                    });
                }

            })
            .catch((error)=>{
                console.error(error);
            })
            ;
        } catch (error) {
            console.log(error);
        }
    });
}
