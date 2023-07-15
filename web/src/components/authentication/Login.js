import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [enter, setEnter] = useState(false)
    const [fail, setFail] = useState(false)

    useEffect(() => {
        document.addEventListener('keypress', detectEnter, true)
    }, []);
    useEffect(() => {
        if (enter) {
            login()
        }
    }, [enter]);
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
            setFail(true)
            return console.log(err);
        }
    }
    return (
        <div id="login">
            <h1>Log In</h1>
            <div>
                <span>
                    <label className="inputLabel" htmlFor="">Email</label>
                    <input type="text" className="inputField" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </span>
                <span>
                    <label className="inputLabel" htmlFor="">Password</label>
                    <input type="password" className="inputField" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </span>
                <span>
                    <Link to='/forgotPassword'>Forgot Password?</Link>
                    <button id="authBtn" type="button" onClick={login}>Log In</button>
                </span>
                <Link to={"/signUp"}><button id="authBtn2" type="button">Dont have an account?</button></Link>
                {fail ? <div style={{ color: 'red' }}>
                    Invalid email or password!
                </div> : null}
            </div>
        </div>
    )
}