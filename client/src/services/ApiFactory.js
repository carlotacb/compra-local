import { getStoreInfo } from './Shop/Store';
import { getCurrentOrders } from './Orders/CurrentOrders';

const endpoints = {
    'getStoreInfo': getStoreInfo,
    'getCurrentOrders': getCurrentOrders
}

function get(name) {
    return endpoints[name];
}

export const ApiFactory = {
    get: get
}
