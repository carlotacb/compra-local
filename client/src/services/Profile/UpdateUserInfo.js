import { urlProd } from '../ApiFactory';
const axios = require('axios');

export function updateUserInfo(idUser, data) {
    const endpoint = '/user/' + idUser ;

    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'put',
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
                        edit: response.data["response"].edited
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