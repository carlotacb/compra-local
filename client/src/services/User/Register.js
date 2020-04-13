
import { urlProd } from '../ApiFactory';
const axios = require('axios');

export function register(data) {
    const endpoint = '/user';

    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'post',
                url: urlProd + endpoint,
                data: data
            })
            .then(function(response) {
                console.log(response)
                if(response.data['error']) {
                    resolve({
                        error: true,
                        message: response.data['message']
                    });
                }
                else{
                    resolve({
                        error: false,
                        user: response.data['response'].user_id
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