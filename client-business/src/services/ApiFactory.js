
// Login
import { login } from './User/Login';
import {register } from './User/Register';
import { getUserInformation } from './User/UserInformation';



export const urlProd = "https://api.compralocal.cat"; 

const endpoints = {
    'login': login,
    'register': register,
    'getUserInformation': getUserInformation
}

function get(name) {
    return endpoints[name];
}

export const ApiFactory = {
    get: get
}
