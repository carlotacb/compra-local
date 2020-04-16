


export function checkLogin(userData) {
    if (!userData["email"].includes("@") || !userData["email"].includes(".")) {
        return [
            true,
            {
                email: "Vaja, sembla un correu electrònic incorrecte.",
                password: false
            }
        ]
    }
    return [
        false,
        {
            email: false,
            password: false
        }
    ]
}


export function checkRegisterStep1(user) {
    var errorAux = {
        name: false,
        email_address: false,
        password: false,
        rpassword: false
    };
    var error = false; 

    if(user["name"] == "" || user["email_address"] == "" 
        || user["password"] == "" || user["rpassword"] == "") {
        errorAux["name"] = "Cap camp pot estar buit";
        errorAux["email_address"] = "Cap camp pot estar buit";
        errorAux["password"] = "Cap camp pot estar buit";
        errorAux["rpassword"] = "Cap camp pot estar buit";
        error = true;
    }

    else if(!user["email_address"].includes("@") || !user["email_address"].includes(".")) {
        errorAux["email_address"] = "Format de l'e-mail incorrecte";
        error = true;
    }

    else if(user["password"] != user["rpassword"]) {
        errorAux["password"] = "Les contrasenyes no coincideixen";
        errorAux["rpassword"] = true;
        error = true;
    }

    return [
        error,
        errorAux
    ]
}


export function checkRegisterStep2(user){
    var errorAux = {
        phone_number: false,
        postal_address: false,
        image: false
    };
    var error = false; 


    var rPhoneNumber = user["phone_number"].replace("+", "");
    var sPhoneNumber = rPhoneNumber.replace(/\s/g, "");
    var r = parseInt(rPhoneNumber);
    var lAddress = user["postal_address"].split(" ");

    if (user["phone_number"] == "" || user["postal_address"] == "") {
        errorAux["phone_number"] = "Cap camp pot estar buit";
        errorAux["postal_address"] = "Cap camp pot estar buit";
        error = true;
    }
    else if(r === NaN || sPhoneNumber.length < 9) {
        errorAux["phone_number"] = "El número de telèfon és invalid.";
        error = true;
    }
    else if(lAddress.length < 4) {
        errorAux["postal_address"] = "La adreça sembla incompleta";
        error = true;
    }
    else if(user["image"] == "") {
        errorAux["image"] = "Eps! Et falta penjar la teva imatge de perfil.";
        error = true;       
    }

    return [
        error,
        errorAux
    ]
}


export function checkProfileEdit(user) {
    user["password"] = "r";
    user["rpassword"] = "r";

    var error1 = checkRegisterStep1(user);
    var error2 = checkRegisterStep2(user);

    var errorAux = {
        name: error1[1]["name"],
        email_address: error1[1]["email_address"],
        phone_number: error2[1]["phone_number"],
        postal_address: error2[1]["postal_address"],
    };

    return [
        error1[0] || error2[0],
        errorAux
    ]
}