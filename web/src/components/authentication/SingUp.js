import React, { useState, useEffect } from "react";

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [name, setName] = useState('');
    const [enter, setEnter] = useState(false)

    useEffect(() => {
        document.addEventListener('keypress', detectEnter, true)
    }, []);

    useEffect(() => {
        if (enter) {
            singUp();
        }
    }, [enter])

    const detectEnter = (e) => {
        if (e.key === 'Enter') {
            setEnter(true)
        }
    }
    async function singUp() {
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
    return (
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
            <button type="button"><a href="/login">Already have an account?</a></button>
        </div>

    )
}