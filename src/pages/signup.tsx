import { useState } from "react";
import Router from "next/router";

function SingupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            Router.push('/login');
        } else {
            setError(data.error || 'Something went wrong');
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Signup</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default SingupPage;