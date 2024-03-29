import sjcl from 'sjcl';
import { urlProd } from '../ApiFactory';
const axios = require('axios');




export function register(username, name, password) {
    const endpoint = '/user';

    return new Promise((resolve, reject) => {
        try {
            const bitArray = sjcl.hash.sha256.hash(password)
            const hash = sjcl.codec.hex.fromBits(bitArray)
            axios({
                method: 'post',
                url: urlProd + endpoint,
                data: {
                    email_address: username,
                    password: hash,
                    name: name,
                    type: "BUSINESS"
                }
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
                        user: response.data['response']["user_id"]
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