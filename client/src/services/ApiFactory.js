import { getStoreInfo, searchStores } from './Store/Store';
import { getProcesHelper } from './Neighborhood/ProcesHelper';
import { getNeedHelp } from './Neighborhood/NeedHelp';

// Login
import { login } from './User/Login';

//Profile
import { updateUserInfo } from './Profile/UpdateUserInfo'
import { getGivenValorations } from './Profile/GivenValoration';
import { getRecivedValorations } from './Profile/RecivedValorations';
import { getUserInformation } from './Profile/UserInformation';
import { changePassword } from './Profile/ChangePassword';

//Orders
import { createOrder } from './Orders/CreateOrder';
import { getCompletedOrders } from './Orders/CompletedOrders';
import { getCurrentOrders } from './Orders/CurrentOrders';
import { getPendingReviewOrders } from './Orders/PendingReviewOrders';
import { valorateLocal } from './Orders/valorateLocal';

export const urlProd = "https://api.compralocal.cat";

const endpoints = {
    'getStoreInfo': getStoreInfo,
    'getCurrentOrders': getCurrentOrders,
    'searchStores': searchStores,
    'getCompletedOrders': getCompletedOrders,
    'getRecivedValorations': getRecivedValorations,
    'getGivenValorations': getGivenValorations,
    'getUserInformation': getUserInformation,
    'login': login,
    'getProcesHelper': getProcesHelper,
    'getNeedHelp': getNeedHelp,
    'createOrder': createOrder,
    'updateUserInfo': updateUserInfo,
    'changePassword': changePassword,
    'getPendingReviewOrders': getPendingReviewOrders,
    'valorateLocal': valorateLocal
}

function get(name) {
    return endpoints[name];
}

export const ApiFactory = {
    get: get
}
