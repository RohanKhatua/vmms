import Router from "next/router";
import Cookie from "js-cookie";

function LogoutButton() {
    const handleLogout = async () => {
        Cookie.remove('token');
        Router.push('/login');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;