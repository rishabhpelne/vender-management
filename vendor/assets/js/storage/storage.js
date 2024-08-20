function setStorage(key , value) {
    localStorage.setItem(key , JSON.stringify(value))
}

function getStorageValue(key) {
    return JSON.parse(localStorage.getItem(key))
}