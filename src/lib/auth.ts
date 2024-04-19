import Cookie from "js-cookie";

export function isAuthenticated() {
    return !!Cookie.get('token');
}