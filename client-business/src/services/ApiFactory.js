
// Login
import { login } from './User/Login';
import { register } from './User/Register';
import { getUserInformation } from './User/UserInformation';
import { getStoreInformation } from './Store/Store';
import { updateStoreInformation } from './Store/UpdateStore'
import { createStoreInformation } from './Store/CreateStore';
import { getProducts } from './Products/getProducts';
import { petitionOrders } from './Orders/PetitionOrders';
import { acceptOrder } from './Orders/AcceptOrder';
import { processOrders } from './Orders/ProcessOrders';
import { nextStepOrder } from './Orders/nextStepOrder';
import { completedOrders } from './Orders/CompletedOrders';
import { updateProducts } from './Products/editProduct';
import { deleteProduct } from './Products/deleteProduct';
import { addProduct } from './Products/addProduct';

export const urlProd = "https://api.compralocal.cat";


const endpoints = {
    'login': login,
    'register': register,
    'getUserInformation': getUserInformation,
    'getStoreInfomation': getStoreInformation,
    'updateStoreInformation': updateStoreInformation,
    'createStoreInformation': createStoreInformation,
    'getProducts': getProducts,
    'petitionOrders': petitionOrders,
    'acceptOrder': acceptOrder,
    'processOrders': processOrders,
    'nextStepOrder': nextStepOrder,
    'completedOrders': completedOrders,
    'updateProducts': updateProducts,
    'deleteProduct': deleteProduct,
    'addProduct': addProduct
}

function get(name) {
    return endpoints[name];
}

export const ApiFactory = {
    get: get
}
