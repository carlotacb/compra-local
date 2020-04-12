import sjcl from 'sjcl'
import { urlProd } from '../ApiFactory';
const axios = require('axios');

export function changePassword(idStore, oldPW, newPW) {
    const hashOld = sjcl.hash.sha256.hash(oldPW);
    const oldPassword = sjcl.codec.hex.fromBits(hashOld);
    const hashNew = sjcl.hash.sha256.hash(newPW);
    const newPassword = sjcl.codec.hex.fromBits(hashNew);
    const endpoint = '/user/' + idStore + '/password';
    console.log(endpoint);
    const data = {
        "new_password": newPassword,
        "old_password": oldPassword
    }
    console.log(data);

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