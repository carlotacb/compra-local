
// Login
import { login } from './User/Login';
import { getUserInformation } from './User/UserInformation';



export const urlProd = "http://api.compralocal.cat"; 

const endpoints = {
    'login': login,
    'getUserInformation': getUserInformation
}

function get(name) {
    return endpoints[name];
}

export const ApiFactory = {
    get: get
}
