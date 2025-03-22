export function isLocalStorageAvailable(): boolean {
    try {
        const testKey = "__storage_test__";
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return false;
    }
}

export const storage = {
    getItem(key: string): string | null {
        if (!isLocalStorageAvailable()) return null;

        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.error(`Error retrieving ${key} from localStorage:`, e);
            return null;
        }
    },
    setItem(key: string, value: string): boolean {
        if (!isLocalStorageAvailable()) return false;

        try {
            localStorage.setItem(key, value);
            return true;
        } catch (e) {
            console.error(`Error storing ${key} in localStorage:`, e);
            return false;
        }
    },
};
