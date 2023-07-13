import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [toggle, setToggle] = useState(true);
    const [enter, setEnter] = useState(false);
    useEffect(() => {
        document.addEventListener('keypress', detectEnter, true)
    }, []);
    useEffect(() => {
        if (enter) {
            sendReset()
        }
    }, [enter])

    const detectEnter = (e) => {
        if (e.key === 'Enter') {
            setEnter(true)
        }
    }
    const sendReset = async () => {
        try {
            if (!email) {
                return alert('Please enter your email')
            }
            const response = await fetch('/api/v1/auth/forgotPassword', {
                method: 'POST',
                body: JSON.stringify({
                    email: email
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const result = await response.json()
            if (result.status === 'success') {
                setToggle(false)
            }
        } catch (err) {
            alert('Incorrect email');
            setEnter(false)
            return console.log(err);
        }
    }
    return (
        <div id="forgot_password">
            <h1>Forgot Password</h1>
            {toggle ? <div id="forgot_info">
                <span>
                    <label htmlFor="">Email</label>
                    <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </span>
                <button id="authBtn" type="button" onClick={sendReset}>Send password reset email</button>
                <Link to={"/login"}><button id="authBtn2" type="button">Back to login</button></Link>
            </div> :
                <span>
                    <h2 style={{ marginBottom: '20px' }}>
                        A password reset link has been sent to your email
                    </h2>
                    <Link to={"/login"}><button id="authBtn2" type="button">Back to login</button></Link>
                </span>
            }
        </div>
    )
}