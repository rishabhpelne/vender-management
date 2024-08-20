export function getData(url) {
    return fetch(url);
}

export function saveData(url , data) {
    const options = {
        method : "POST",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
    }
    return fetch(url,options)
}

export function updateData(url , data) {
    const options = {
        method : "PUT",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
    }
    return fetch(url,options)
}