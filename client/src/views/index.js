
import {Register as R} from './Register/Register';
import {Profile as P} from './Profile/Profile';
import {Orders as O} from './Orders/Orders';
import {ProcessOrders as PO} from './Orders/ProcessOrders';
import {CompletedOrders as CO} from './Orders/CompletedOrders';
import {PendingReviewOrder as PRO} from './Orders/PendingReviewOrder';
import {Neighborhood as N} from './Neighborhood/Neighborhood';
import {ProcessPickUp as PPU} from './Neighborhood/ProcessPickUp'
import {NeedHelp as NH} from './Neighborhood/NeedHelp'
import {Login as L} from './Login/Login';


import {ShopSearch as SS} from './Shop/ShopSearch';
import {ShopStore as SSt} from './Shop/ShopStore';
import {ShopErrorLocation as SEL} from './Shop/ShopErrorLocation';

export const ShopSearch = SS;
export const ShopStore = SSt;
export const ShopErrorLocation = SEL;
export const Register = R;
export const Profile = P;
export const Orders = O;
export const ProcessOrders = PO;
export const CompletedOrders = CO;
export const PendingReviewOrder = PRO;
export const Neighborhood = N;
export const Login = L;
export const ProcessPickUp = PPU;
export const NeedHelp = NH;