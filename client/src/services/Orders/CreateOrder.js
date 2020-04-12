import { urlProd } from '../ApiFactory';
const axios = require('axios');



export function createOrder(storeId, userId, cart, type_delivery) {
    const endpoint = '/order/';

    return new Promise((resolve, reject) => {
        try {

            var o = {
                local_id: storeId,
                user_id: userId,
                order_type: type_delivery,
                products: []
            }

            for(var i in cart) {
                o["products"] = {
                    product_id: cart[i]["id"],
                    quantity: cart[i]["quantity"]
                }
            }

            axios({
                method: 'get',
                url: urlProd + endpoint,
                data: o
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