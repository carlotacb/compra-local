import { getStoreInfo, searchStores } from './Store/Store';

// Helpers
import { getProcesHelper } from './Neighborhood/ProcesHelper';
import { getNeedHelp } from './Neighborhood/NeedHelp';
import { assignHelp } from './Neighborhood/AssignHelp';
import { finishHelp } from './Neighborhood/FinishHelp';

// Login
import { login } from './User/Login';

//Profile
import { updateUserInfo } from './Profile/UpdateUserInfo';
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
import { valorateHelper } from './Orders/valorateHelper';

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
    'valorateLocal': valorateLocal,
    'valorateHelper': valorateHelper,
    'assignHelp': assignHelp,
    'finishHelp': finishHelp
}

function get(name) {
    return endpoints[name];
}

export const ApiFactory = {
    get: get
}
