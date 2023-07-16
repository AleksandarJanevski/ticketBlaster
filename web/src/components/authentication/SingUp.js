import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { verifyData } from "../functions/functions";

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [name, setName] = useState('');
    const [enter, setEnter] = useState(false);

    useEffect(() => {
        document.addEventListener('keypress', detectEnter, true);
    }, []);

    useEffect(() => {
        if (enter) {
            singUp();
        }
    }, [enter])

    const detectEnter = (e) => {
        if (e.key === 'Enter') {
            setEnter(true);
        }
    }
    async function singUp() {
        const obj = {
            email: email,
            password: password,
            confirm_password: confirm,
            name: name,
        }
        const verified = verifyData(obj, true);
        if (!verified) return
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
            });
            const result = await response.json();
            if (result.status === 'success') {
                window.location.href = "http://localhost:3000/";
            }
        } catch (err) {
            setEnter(false);
            return console.log(err);
        }
    }
    return (
        <div id="signUp">
            <h1>Sign Up</h1>
            <div>
                <span><label className="inputLabel" htmlFor="">Full Name</label>
                    <input type="text" className="inputField" required value={name} onChange={(e) => { setName(e.target.value) }} /></span>
                <span><label className="inputLabel" htmlFor="">Email</label>
                    <input type="text" className="inputField" required value={email} onChange={(e) => { setEmail(e.target.value) }} /></span>
                <span><label className="inputLabel" htmlFor="">Password</label>
                    <input type="password" className="inputField" required value={password} onChange={(e) => { setPassword(e.target.value) }} /></span>
                <span><label className="inputLabel" htmlFor="">Re-type Password</label>
                    <input type="password" className="inputField" required value={confirm} onChange={(e) => { setConfirm(e.target.value) }} /></span>
                <button id="authBtn" type="button" onClick={singUp}>Create Account</button>
                <Link to={"/login"}><button id="authBtn2" type="button">Already have an account?</button></Link>
            </div>
        </div>
    )
}