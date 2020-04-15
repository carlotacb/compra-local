import React from 'react';
import { UserInformationEdit } from './UserInformationEdit';
import { UserInformation } from './UserInformation';


export function UserInformationRouter() {
    const [edit, setEdit] = React.useState(false);

    function handleEdit(){
        setEdit(!edit)
    }

    if (edit) return <UserInformationEdit onClick={()=>handleEdit()} />;
    else return <UserInformation onClick={()=>handleEdit()}/>;
}