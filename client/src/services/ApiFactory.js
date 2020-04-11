import { getStoreInfo } from './Shop/Store';
import { getCurrentOrders } from './Orders/CurrentOrders';
import { getCompletedOrders } from './Orders/CompletedOrders';
import { getRecivedValorations } from './Profile/RecivedValorations';
import { getGivenValorations } from './Profile/GivenValoration';
import { getUserInformation } from './Profile/UserInformation';
import { getProcesHelper } from './Neighborhood/ProcesHelper';

const endpoints = {
    'getStoreInfo': getStoreInfo,
    'getCurrentOrders': getCurrentOrders,
    'getCompletedOrders': getCompletedOrders,
    'getRecivedValorations': getRecivedValorations,
    'getGivenValorations': getGivenValorations,
    'getUserInformation': getUserInformation,
    'getProcesHelper': getProcesHelper
}

function get(name) {
    return endpoints[name];
}

export const ApiFactory = {
    get: get
}
