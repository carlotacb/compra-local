import { urlProd } from '../ApiFactory';
const axios = require('axios');

export function getRecivedValorations(idStore) {
    const endpoint = '/review/user/' + idStore + '/all';

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
                        reviews_list: response.data['response'].reviews_list
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