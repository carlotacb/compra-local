import { urlProd } from '../ApiFactory';
import { getProducts } from '../Products/Products';
const axios = require('axios');


export function searchStores(userInfo) {
    const endpoint = '/admin/search'
    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'get',
                url: urlProd + endpoint,
                params: {
                    'latitude': parseFloat(userInfo["latitude"]),
                    'longitude': parseFloat(userInfo["longitude"])
                }
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
                        local_list: response.data['response'].local_list
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
    })
}


export function getStoreInfo(idStore) {
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
                    getProducts(idStore)
                        .then((res) => {
                            if (res["error"]) {
                                resolve({
                                    error: true,
                                    message: res["message"]
                                });
                            }
                            else {
                                var local = response.data['response'].local;
                                local["products"] = res["product_list"];
                                local["punctuation"] = response.data['response'].average;
                                local["tags"] = response.data['response'].tags;
                                resolve({
                                    error: false,
                                    local: local
                                });
                            }
                        })

                }
            }).catch((err) => {
                    resolve({
                        error: true,
                        message: err.message
                    });
                });
        } catch (error) {
            console.log(error);
        }
    })
}
