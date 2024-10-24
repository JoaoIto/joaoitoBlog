"use client"

import { getStorageItem } from "../api/cookies/getStorageItem";

export const checkUserAuthenticated = () => {
    const userToken = getStorageItem();
    return !!userToken;
}