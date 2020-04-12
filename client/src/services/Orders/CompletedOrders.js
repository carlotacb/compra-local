import { urlProd } from '../ApiFactory';
const axios = require('axios');

export function getCompletedOrders(idStore) {
    const endpoint = '/order/completed/user/' + idStore;

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
                        orders: response.data['response'].completed_order_list
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