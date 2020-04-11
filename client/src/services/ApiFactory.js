import { getStoreInfo, searchStores } from './Store/Store';
import { getCurrentOrders } from './Orders/CurrentOrders';
const endpoints = {
    'getStoreInfo': getStoreInfo,
    'getCurrentOrders': getCurrentOrders,
    'searchStores': searchStores
}

function get(name) {
    return endpoints[name];
}

export const ApiFactory = {
    get: get
}
