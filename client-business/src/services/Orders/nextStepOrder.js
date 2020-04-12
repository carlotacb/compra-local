import { urlProd } from '../ApiFactory';
const axios = require('axios');

export function nextStepOrder(idStore, nextStep) {
    const endpoint = '/order/' + idStore;

    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'put',
                url: urlProd + endpoint,
                data: {
                    "new_status": nextStep
                }
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
                        list: response.data['response']
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