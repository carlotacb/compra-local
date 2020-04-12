import { urlProd } from '../ApiFactory';
const axios = require('axios');

export function assignHelp(data) {
    const endpoint = '/help/assign';

    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'post',
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
                        list: response.data['response'].helper_list
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