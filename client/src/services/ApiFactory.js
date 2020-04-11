import { getStoreInfo, searchStores } from './Store/Store';
import { getCurrentOrders } from './Orders/CurrentOrders';
import { getCompletedOrders } from './Orders/CompletedOrders';
import { getRecivedValorations } from './Profile/RecivedValorations';
import { getGivenValorations } from './Profile/GivenValoration';
import { getUserInformation } from './Profile/UserInformation';
import { getProcesHelper } from './Neighborhood/ProcesHelper';

// Login
import { login } from './User/Login';

export const urlProd = "http://api.compralocal.cat"; 

const endpoints = {
    'getStoreInfo': getStoreInfo,
    'getCurrentOrders': getCurrentOrders,
    'searchStores': searchStores,
    'getCompletedOrders': getCompletedOrders,
    'getRecivedValorations': getRecivedValorations,
    'getGivenValorations': getGivenValorations,
    'getUserInformation': getUserInformation,
    'login': login,
    'getProcesHelper': getProcesHelper
}

function get(name) {
    return endpoints[name];
}

export const ApiFactory = {
    get: get
}
