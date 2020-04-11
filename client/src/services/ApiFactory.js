import { getStoreInfo } from './Shop/Store';
import { getCurrentOrders } from './Orders/CurrentOrders';
import { getCompletedOrders } from './Orders/CompletedOrders';

const endpoints = {
    'getStoreInfo': getStoreInfo,
    'getCurrentOrders': getCurrentOrders,
    'getCompletedOrders': getCompletedOrders
}

function get(name) {
    return endpoints[name];
}

export const ApiFactory = {
    get: get
}
