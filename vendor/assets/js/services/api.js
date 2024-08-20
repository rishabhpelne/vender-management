function getData(url) {
    return fetch(url);
}

function saveData(url , data) {
    const options = {
        method : "POST",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
    }
    return fetch(url,options)
}