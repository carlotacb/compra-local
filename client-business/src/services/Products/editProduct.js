import { urlProd } from '../ApiFactory';
const axios = require('axios');


export function updateProducts(idStore, productInfo) {
    const endpoint = '/admin/' +  idStore + '/product/' + productInfo["id"];
    var product = {
        description: productInfo["description"],
        name: productInfo["name"],
        price_type: productInfo["price_type"],
        product_group: productInfo["product_category"]
    }
    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'put',
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
