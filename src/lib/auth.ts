"use client";
import Cookies from "js-cookie";

export function isAuthenticated() {
    console.log('Checking for cookies')
    console.log(Cookies.get('token'));
    return !!Cookies.get('token');
}