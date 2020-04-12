
// Login
import { login } from './User/Login';
import {register } from './User/Register';
import { getUserInformation } from './User/UserInformation';
import { getStoreInformation } from './Store/Store';



export const urlProd = "https://api.compralocal.cat"; 

const endpoints = {
    'login': login,
    'register': register,
    'getUserInformation': getUserInformation,
    'getStoreInfomation': getStoreInformation
}

function get(name) {
    return endpoints[name];
}

export const ApiFactory = {
    get: get
}
