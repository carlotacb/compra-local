import { getStoreInfo } from './Shop/Store';
import { getCurrentOrders } from './Orders/CurrentOrders';
import { getCompletedOrders } from './Orders/CompletedOrders';
import { getRecivedValorations } from './Profile/RecivedValorations';

const endpoints = {
    'getStoreInfo': getStoreInfo,
    'getCurrentOrders': getCurrentOrders,
    'getCompletedOrders': getCompletedOrders,
    'getRecivedValorations': getRecivedValorations,
}

function get(name) {
    return endpoints[name];
}

export const ApiFactory = {
    get: get
}
