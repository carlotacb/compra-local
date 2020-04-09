import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { login } from "./mockLogin";


export function Login() {
    const {user, setUser} = useContext(UserContext);

    return (
        <div>
            <h1>Entra a Compra Local</h1>

            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button onClick={async () => {
                const user = await login();
                setUser(user);
            }}>Login</button>

            
        </div>
    )
}