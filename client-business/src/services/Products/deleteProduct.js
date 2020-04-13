import { urlProd } from '../ApiFactory';
const axios = require('axios');

    
export function deleteProduct(idStore, productId) {
    const endpoint = '/admin/' +  idStore + '/product/' + productId;
    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'delete',
                url: urlProd + endpoint
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
