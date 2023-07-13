import React, { useState, useEffect } from "react";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [enter, setEnter] = useState(false)

    useEffect(() => {
        document.addEventListener('keypress', detectEnter, true)
    }, []);

    useEffect(() => {
        if (enter) {
            login()
        }
    }, [enter])

    const detectEnter = (e) => {
        if (e.key === 'Enter') {
            setEnter(true)
        }
    }
    async function login() {
        try {
            const response = await fetch('/api/v1/auth/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                credentials: 'include',
            })
            const result = await response.json()
            console.log(result);
            if (result.status === 'success') {
                window.location.href = "http://localhost:3000/"
            }
        } catch (err) {
            setEnter(false)
            alert('Incorrect login information');
            return console.log(err);
        }
    }
    return (
        <div id="login">
            <label htmlFor="">Email</label>
            <input type="text" className="inputField" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <label htmlFor="">Password</label>
            <input type="password" className="inputField" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <span>
                <a href="/forgotPassword">Forgot Password?</a>
                <button type="button" onClick={login}>Log In</button>
            </span>
            <button type="button"><a href="/signUp">Don't have an account?</a></button>
        </div>
    )
}