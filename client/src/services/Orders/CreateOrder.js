import { urlProd } from '../ApiFactory';
const axios = require('axios');



export function createOrder(storeId, userId, products, type_delivery) {
    const endpoint = '/order';

    return new Promise((resolve, reject) => {
        try {
            var data = {
                local_id: storeId,
                user_id: userId,
                order_type: type_delivery,
                product_list: products
            }
            axios({
                method: 'post',
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
                        order_id: response.data['response'].order_id
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