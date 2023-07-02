import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ResetPassword = () => {
    const { token } = useParams()
    const [password, setPassword] = useState('')
    const [toggle, setToggle] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    useEffect(() => {
        if (token) {
            resetPassword()
        }
    }, [toggle])
    const resetPassword = async () => {
        try {
            if (!password && confirmPassword && password !== confirmPassword) {
                return alert('Passwords do not match');
            }
            const body = {
                newPassword: password,
                confirmPassword: confirmPassword
            }
            const response = await fetch(`/api/v1/auth/resetPassword/${token}`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include'
            })
            const result = await response.json();
            if (result.status === 'success') {
                window.location.href = '/'
            }
        } catch (err) {
            return console.log(err);
        }
    }
    return (
        <div id="reset_password">
            <h1>Reset Password</h1>
            <div id="reset_info">
                <span>
                    <label htmlFor="">Password</label>
                    <input type="password" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </span>
                <span>
                    <label htmlFor="">Re-Type Password</label>
                    <input type="password" required value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                </span>
                <button type="button" onClick={() => { setToggle(!toggle) }}>Submit</button>
            </div>
        </div>
    )
}