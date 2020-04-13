import { Sidebar as S } from './Sidebar/SideBar'
import { ListView as LV } from './ListView/ListView';

//Store
import { StoreEdit as SE} from './Store/StoreEdit';
import { StoreInfo as SI} from './Store/StoreInfo';
import { StoreProfile as SP} from './Store/StoreProfile';

//Orders
import { PetitionOrderCard as POC } from './Cards/PetitionOrderCard';
import { ProcessOrderCard as PROC } from './Cards/ProcessOrderCard';
import { CompletedOrderCard as COC } from './Cards/CompletedOrderCard';

//Dialog
import { TicketDialog as TD } from './Dialog/TicketDialog';
import { ConfirmationDialog as CD } from './Dialog/ConfirmationDialog';
import { AddProductDialog as APD} from './Dialog/AddProductDialog';

export const Sidebar = S;
export const ListView = LV;

export const StoreInfo = SI;
export const StoreEdit = SE;
export const StoreProfile = SP;

export const PetitionOrderCard = POC;
export const ProcessOrderCard = PROC;
export const CompletedOrderCard = COC;

export const TicketDialog = TD;
export const ConfirmationDialog = CD;
export const AddProductDialog = APD;