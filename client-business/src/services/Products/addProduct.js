import { urlProd } from '../ApiFactory';
const axios = require('axios');


export function addProduct(idStore, productInfo) {
    const endpoint = '/admin/' +  idStore + '/product/';
    var product = {
        currency: 'EUR',
        description: productInfo["description"],
        name: productInfo["name"],
        price_type: productInfo["price_type"],
        product_group: parseInt(productInfo["product_category"]),
        price: parseFloat(productInfo["price"])
    }
    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'post',
                url: urlProd + endpoint,
                data: product
            }).then(function (response) {
                if (response.data['error'] || !response.data['response']['edited'] ) {
                    resolve({
                        error: true,
                        message: "not updated"
                    });
                }
                else {
                    resolve({
                        error: false
                    });
                }

            })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.log(error);
        }
    });
}
