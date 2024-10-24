import nookies from 'nookies';

export const getStorageItem = () => {
    const cookies = nookies.get();
    const token = cookies.token;
    return token;
};