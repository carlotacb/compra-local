import React from 'react';
import { UserInformationEdit } from './UserInformationEdit';
import { UserInformation } from './UserInformation';
import { UserContext } from '../../context/UserContext';
import { Loading } from '../Loading/Loading';


export function UserInformationRouter() {
    const [edit, setEdit] = React.useState(false);
    const { user, setUser } = React.useContext(UserContext);

    function handleEdit(userInfo){ 
        if(userInfo) { // When comes from UserInfomationEdit
            var aUser = {...user};
            for(var i in userInfo) {
                aUser[i] = userInfo[i];
            }
            setUser(aUser);
            setEdit(!edit);
        }
        else {
            setEdit(!edit);
        }
    }

    if(!user) return <Loading/>

    if (edit) return <UserInformationEdit user={user} onClick={(userInfo)=>handleEdit(userInfo)} />;
    else return <UserInformation user={user} onClick={()=>handleEdit()}/>;
}