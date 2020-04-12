import { urlProd } from '../ApiFactory';
const axios = require('axios');

export function valorateLocal(data) {
    const endpoint = '/review/local';

    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'post',
                url: urlProd + endpoint,
                data: data
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
                        orders: response.data['response']
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