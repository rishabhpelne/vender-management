export function setStorage(key , value) {
    localStorage.setItem(key , JSON.stringify(value))
}

export function getStorageValue(key) {
    return JSON.parse(localStorage.getItem(key))
}