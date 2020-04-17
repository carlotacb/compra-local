import React from 'react';
import { UserInformationEdit } from './UserInformationEdit';
import { UserInformation } from './UserInformation';
import { UserContext } from '../../context/UserContext';
import { Loading } from '../Loading/Loading';
import { ApiFactory } from '../../services/ApiFactory';

export function UserInformationRouter() {
    const [edit, setEdit] = React.useState(false);
    const [error, setError] = React.useState({
        email_address: false,
        name: false,
        phone_number: false,
        postal_address: false
    });
    const { user, setUser } = React.useContext(UserContext);

    function handleEdit(userInfo) {
        if (userInfo) { // When comes from UserInfomationEdit

            // Update Backend:
            const updateUserInfoAPI = ApiFactory.get('updateUserInfo');
            updateUserInfoAPI(user["id"], userInfo)
            .then((res)=> {
                if(res["error"]) {
                    // Handle error
                    setError({
                        ...error,
                        "email_address": "Error inesperad. Si us plau, provar-ho més tard."
                    });
                }
                else {
                    var aUser = { ...user };
                    for (var i in userInfo) {
                        aUser[i] = userInfo[i];
                    }
                    setUser(aUser);
                    setEdit(!edit);
                }
            })
        }
        else {
            setEdit(!edit);
        }
    }

    if (!user) return <Loading />

    if (edit) return <UserInformationEdit user={user} onClick={(userInfo) => handleEdit(userInfo)} />;
    else return <UserInformation user={user} onClick={() => handleEdit()} />;
}