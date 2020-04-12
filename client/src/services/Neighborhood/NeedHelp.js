import { urlProd } from '../ApiFactory';
const axios = require('axios');

export function getNeedHelp(lat, long) {
    const endpoint = '/help';

    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'get',
                url: urlProd + endpoint
            }).then(function(response) {
                console.log(response)
                if(response.data['error']) {
                    resolve({
                        error: true,
                        message: response.data['message']
                    });
                }
                else {
                    resolve({
                        error: false,
                        orders: response.data['response']
                    });
                }
            })
            .catch((err) => {
                console.log(err.message)
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