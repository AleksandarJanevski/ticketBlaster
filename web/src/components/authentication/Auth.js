import React, { useState, useEffect } from "react";

export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [name, setName] = useState('');
    const [toggle, setToggle] = useState(false);

    async function login(e) {
        e.preventDefault()
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
            } else {
                alert('Incorrect login information');
            }
        } catch (err) {
            return console.log(err);
        }
    }
    async function singUp(e) {
        e.preventDefault();
        if (password !== confirm) {
            return alert('Passwords do not match');
        }
        try {
            const response = await fetch('/api/v1/users', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName: name,
                    email: email,
                    password: password
                }),
                credentials: 'include'
            })
            const result = await response.json()
            if (result.status === 'success') {
                window.location.href = "http://localhost:3000/"
            }
        } catch (err) {
            return console.log(err);
        }
    }
    function togl(e) {
        e.preventDefault()
        setToggle(!toggle);
    }
    return (
        <div id="auth">
            {toggle ? <div id="login">
                <label htmlFor="">Email</label>
                <input type="text" className="inputField" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <label htmlFor="">Password</label>
                <input type="password" className="inputField" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <span>
                    <a href="/forgotPassword">Forgot Password?</a>
                    <button type="button" onClick={login}>Log In</button>
                </span>
                <button type="button" onClick={togl}>Don't have an account?</button>
            </div>
                :
                <div id="signUp">
                    <label htmlFor="">Full Name</label>
                    <input type="text" className="inputField" required value={name} onChange={(e) => { setName(e.target.value) }} />
                    <label htmlFor="">Email</label>
                    <input type="text" className="inputField" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <label htmlFor="">Password</label>
                    <input type="password" className="inputField" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <label htmlFor="">Re-type Password</label>
                    <input type="password" className="inputField" required value={confirm} onChange={(e) => { setConfirm(e.target.value) }} />
                    <button type="button" onClick={singUp}>Create Account</button>
                    <button type="button" onClick={togl}>Already have an account?</button>
                </div>}
        </div>
    )
}