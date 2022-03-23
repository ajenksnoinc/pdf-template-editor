// https://xkcd.com/927/

export const getItem = (key, defaultValue = "") => {
    let value = localStorage.getItem(key);

    if(value === null) {
        return defaultValue;
    }

    try {
        return JSON.parse(value).value; // See setItem, actual value is encapsulated
    } catch(ex) {
        console.error(`Error parsing localStorage item "${key}"`);
        return defaultValue;
    }
};

export const setItem = (key, value) => {
    try {
        let stashed = { value }; // We encapsulate it so we can always perform JSON.parse without worrying about type checking
        localStorage.setItem(key, JSON.stringify(stashed));
        return stashed;
    } catch(ex) {
        console.error(`Error storing "${key}" to localStorage`);
        console.error(ex);
        return null;
    }
};

export const setItems = obj => {
    Object.keys(obj).forEach(key => setItem(key, obj[key]));
};

export const removeItem = key => {
    try {
        localStorage.removeItem(key);
    } catch(ex) {
        console.error(`Error removing "${key}" from localStorage`);
        console.error(ex);
    }
};

export const removeItems = (...items) => {
    items.forEach(key => removeItem(key));
};

export const clear = () => {
    try {
        localStorage.clear();
    } catch(ex) {
        console.error("Error clearing localStorage");
        console.error(ex);
    }
};

export const hasItem = key => {
    let value = localStorage.getItem(key);

    if(value === null) {
        return false;
    }

    try {
        return JSON.parse(value).hasOwnProperty("value");
    } catch(ex) {
        console.error(`Error parsing localStorage item "${key}"`);
        return false;
    }
};

export default {
    getItem,
    setItem, setItems,
    removeItem, removeItems,
    hasItem,
    clear
};
