"use client";
import Cookies from "js-cookie";

export function isAuthenticated() {
    console.log('Checking for cookies')
    console.log(Cookies.get('token'));
    return Cookies.get('token');
}

export function parseJWT(token: string) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
}