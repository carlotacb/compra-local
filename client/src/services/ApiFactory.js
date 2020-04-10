

const endpoints = {

}

function get(name) {
    return endpoints[name];
}

export const ApiFactory = {
    get: get
}
