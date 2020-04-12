import { urlProd } from '../ApiFactory';
const axios = require('axios');

export function updateUserInfo(idStore, data) {
    const endpoint = '/user/' + idStore ;
    console.log(endpoint)

    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'put',
                url: urlProd + endpoint,
                data: data
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
                        user: response.data['response']
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