// Save JSON data in localStorage
export const setJsonData = <T>(key: string, value: T): void => {
    try {
        const jsonValue = JSON.stringify(value);
        localStorage.setItem(key, jsonValue);
    } catch (error) {
        console.error("Error saving JSON data:", error);
    }
};

// Get JSON data from localStorage
export const getJsonData = <T>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
        console.error("Error parsing JSON data:", error);
        return null;
    }
};

// Save plain string data in localStorage
export const setData = (key: string, value: string): void => {
    localStorage.setItem(key, value);
};

// Get plain string data from localStorage
export const getData = (key: string): string | null => {
    return localStorage.getItem(key);
};
