import sjcl from 'sjcl'
import { urlProd } from '../ApiFactory';
const axios = require('axios');




export function login(username, password) {
    const endpoint = '/user/login';

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
                    type: "BUSINESS"
                }
            })
            .then(function(response) {
                if(response.data['error']) {
                    resolve({
                        error: true,
                        message: response.data['message']
                    });
                }
                else if (!response.data["response"]["success"]) {
                    resolve({
                        error: true,
                        message: "password"
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