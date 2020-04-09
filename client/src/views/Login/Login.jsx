import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";


export function Login() {
    const {user, setUser} = useContext(UserContext);

    return (
        <div>
            <h1>Entra a Compra Local</h1>

            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button onClick={() => {
                setUser({ id: 4, username: "bob", email: "me@bob.com" });
            }}>Login</button>


        </div>
    )
}