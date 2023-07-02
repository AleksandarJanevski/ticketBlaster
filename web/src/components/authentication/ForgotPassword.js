import React, { useState } from "react";

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [toggle, setToggle] = useState(true)
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
                <button type="button" onClick={sendReset}>Send password reset email</button>
                <button><a href="/login">Back to login</a></button>
            </div> :
                <span>
                    <h2>
                        A password reset link has been sent to your email
                    </h2>
                    <button><a href="/login">Back to login</a></button>
                </span>
            }
        </div>
    )
}