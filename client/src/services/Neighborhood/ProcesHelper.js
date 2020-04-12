import { urlProd } from '../ApiFactory';
const axios = require('axios');

export function getProcesHelper(idStore) {
    const endpoint = '/order/helping/user/' + idStore;

    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'get',
                url: urlProd + endpoint
            }).then(function(response) {
                if(response.data['error']) {
                    resolve({
                        error: true,
                        message: response.data['message']
                    });
                }
                else {
                    resolve({
                        error: false,
                        list: response.data['response'].helping_order_list
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