import { getStoreInfo } from './Shop/Store';
import { getCurrentOrders } from './Orders/CurrentOrders';
import { getCompletedOrders } from './Orders/CompletedOrders';
import { getRecivedValorations } from './Profile/RecivedValorations';
import { getGivenValorations } from './Profile/GivenValoration';
import { getUserInformation } from './Profile/UserInformation';
import { getProcesHelper } from './Neighborhood/ProcesHelper';
import { getNeedHelp } from './Neighborhood/NeedHelp';

// Login
import { login } from './User/Login';

export const urlProd = "http://api.compralocal.cat"; 

const endpoints = {
    'getStoreInfo': getStoreInfo,
    'getCurrentOrders': getCurrentOrders,
    'getCompletedOrders': getCompletedOrders,
    'getRecivedValorations': getRecivedValorations,
    'getGivenValorations': getGivenValorations,
    'getUserInformation': getUserInformation,
    'login': login,
    'getProcesHelper': getProcesHelper,
    'getNeedHelp': getNeedHelp
}

function get(name) {
    return endpoints[name];
}

export const ApiFactory = {
    get: get
}
