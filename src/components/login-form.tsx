"use client";
import { useState } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Alert, AlertTitle } from "./ui/alert";

function LoginPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [pageType, setPageType] = useState('login');

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        console.log(res);
        const data = await res.json();
        if (res.ok) {
            Cookies.set('token', data.token, { expires: 1 });
            Router.push('/');
        } else {
            setError(data.error || 'Something went wrong');
        }
    };

    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        if (res.ok) {
            Router.push('/');
        } else {
            setError(data.error || 'Something went wrong');
        }
    };

    return (
        pageType === 'login' ?
            <form onSubmit={handleLogin}>
                <div className="max-w-md mx-auto">
                    <h2 className="text-white text-3xl font-bold mb-6">Welcome Back</h2>
                    {error && <Alert className="mb-6 bg-black text-white border-0">
                        <AlertTitle>{error}</AlertTitle>
                    </Alert>}
                    <div className="flex flex-col gap-4 text-white">
                        <Label>Email</Label>
                        <Input type='email' placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                        <Label>Password</Label>
                        <Input type='password' placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                        <Button className="w-full">Sign In</Button>
                    </div>

                    <p className="text-white text-center text-sm mt-6">
                        Don't have an account? {
                            <Button variant='link' className="text-white" onClick={(e) => { e.preventDefault(); setPageType('sign-up') }}>Sign Up</Button>
                        }
                    </p>
                </div>
            </form> :
            <form onSubmit={handleSignup}>
                <div className="max-w-md mx-auto">
                    <h2 className="text-white text-3xl font-bold mb-6">Sign Up</h2>
                    {error && <Alert className="mb-6 bg-black text-white border-0">
                        <AlertTitle>{error}</AlertTitle>
                    </Alert>}
                    <div className="flex flex-col gap-4 text-white">
                        <Label className="text-white">Name</Label>
                        <Input type='text' placeholder="John Doe" onChange={(e) => setName(e.target.value)} />
                        <Label>Email</Label>
                        <Input type='email' placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                        <Label>Password</Label>
                        <Input type='password' placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                        <Button className="w-full">Sign Up</Button>
                    </div>

                    <p className="text-white text-center text-sm mt-6">
                        Already have an account? {
                            <Button variant='link' className="text-white" onClick={(e) => { e.preventDefault(); setPageType('login') }}>Log In</Button>
                        }
                    </p>
                </div>
            </form>
    );
}

export default LoginPage;