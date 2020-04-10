import { getStoreInfo } from './Shop/Store';

const endpoints = {
    'getStoreInfo': getStoreInfo
}

function get(name) {
    return endpoints[name];
}

export const ApiFactory = {
    get: get
}
