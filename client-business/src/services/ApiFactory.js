
// Login
import { login } from './User/Login';
import { register } from './User/Register';
import { getUserInformation } from './User/UserInformation';
import { getStoreInformation } from './Store/Store';
import { updateStoreInformation } from './Store/UpdateStore'


export const urlProd = "https://api.compralocal.cat";

const endpoints = {
    'login': login,
    'register': register,
    'getUserInformation': getUserInformation,
    'getStoreInfomation': getStoreInformation,
    'updateStoreInformation': updateStoreInformation
}

function get(name) {
    return endpoints[name];
}

export const ApiFactory = {
    get: get
}
