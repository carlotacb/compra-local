import { Sidebar as Sid } from './Sidebar/SideBar';
import { SmallSidebar as Sidd } from './Sidebar/SmallSidebar';
import { ListView as LV } from './Listview/ListView';
import { StoreCard as SC } from './Card/StoreCard';
import { VerticalStepper as VS } from './Stepper/VerticalStepper';
import { Loading as L } from './Loading/Loading';

// Boxes
import { SearchBox as SB} from './Box/SearchBox';

// Dialogs 
import { ConfirmationDialog as CD } from './Dialog/ConfirmationDialog';
import { AddProductDialog as APD } from './Dialog/AddProductDialog';
import { ValorationDialog as VD } from './Dialog/ValorationDialog';
import { TicketDialog as TD } from './Dialog/TicketDialog';
import { PasswordDialog as PD } from './Dialog/PasswordDialog';
import { VolunteerDialog as VDD} from './Dialog/VolunteerDialog';

// Cards
import { ReviewCard as RC } from './Card/ReviewCard'
import { CompletedOrderCard as COC } from './Card/CompletedOrderCard'
import { HelperCard as HC } from './Card/HelperCard'
import { HelperPetitionCard as HPC } from './Card/HelperPetitionCard'
import { PendingReviewCard as PRC } from './Card/PendingReviewCard'
import { NoInfoCard as NIC } from './Card/NoInfoCard'
import {LoginInfo as LI} from './Card/LoginInfo';

//Store 
import { StoreBody as StB } from './Store/StoreBody';
import { StoreHeader as SH} from './Store/StoreHeader';
import { StoreProducts as SP } from './Store/StoreProducts';

// Cart
import { ShoppingCart as SCart} from './Cart/ShoppingCart';

// User Profile
import {UserInformation as UI} from './UserProfile/UserInformation';
import {UserInformationEdit as UIE} from './UserProfile/UserInformationEdit';


//Orders
import {PendingOrder as PnO} from './Orders/PendingOrder';

export const Sidebar = Sid;
export const SmallSidebar = Sidd;
export const SearchBox = SB;
export const ListView = LV;
export const StoreCard = SC;
export const ConfirmationDialog = CD;
export const AddProductDialog = APD;
export const ValorationDialog = VD;
export const TicketDialog = TD;
export const ReviewCard = RC;
export const StoreBody = StB;
export const StoreHeader = SH; 
export const CompletedOrderCard = COC
export const HelperCard = HC;
export const VerticalStepper = VS;
export const StoreProduct = SP;
export const ShoppingCart = SCart;
export const PasswordDialog = PD;
export const HelperPetitionCard = HPC;
export const PendingReviewCard = PRC;
export const Loading = L;
export const NoInfoCard = NIC;
export const LoginInfo = LI;
export const PendingOrder = PnO;
export const VolunteerDialog = VDD;
// User
export const UserInformation = UI;
export const UserInformationEdit = UIE;