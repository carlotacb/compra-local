

export function checkChangePassword(passInfo) {
    var alertError = {
        current: false,
        new: false,
        rnew: false
    }
    for(var i in passInfo) {
        if (passInfo[i] == "") {
            alertError[i] = "Cap camp pot estar buit"
            return [
                true,
                alertError
            ]
        }
    }
    if(passInfo["new"] != passInfo["rnew"]) {
        alertError["new"] = "Les contrasenyes no coincideixen";
        alertError["rnew"] = true;
        return [
            true,
            alertError
        ]
    }
    else {
        return[
            false,
            alertError
        ]
    }
}