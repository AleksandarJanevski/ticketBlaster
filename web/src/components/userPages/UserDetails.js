import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { preview, uploadFunc, verifyData } from '../functions/functions'
import { getUser } from "../../redux/actions/userActions";

export const UserDetails = () => {
    const dispatch = useDispatch()
    const userRedux = useSelector(state => state.userReducer.user)
    const [user, setUser] = useState({
        email: userRedux.email,
        fullName: userRedux.fullName,
        picture: userRedux.picture,
        role: userRedux.role
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState('');
    const [previewPic, setPreviewPic] = useState('');
    const [sent, setSent] = useState(false);
    const id = useSelector(state => state.idReducer.id.id);
    const [change, setChange] = useState(false);
    const picturePreview = (e) => {
        preview(e, setPreviewPic, setImage);
    };
    useEffect(() => {
        if (sent) {
            updateUser();
        }
    }, [sent]);
    const handleUpload = async (e) => {
        try {
            e.preventDefault()
            let valid = verifyData(user, false);
            if (valid) {
                await uploadFunc(previewPic, user.picture, setUser, user, setSent, sent, 'profile');
            }
        } catch (err) {
            alert(err.message)
        }
    }
    const updateUser = async () => {
        try {
            const response = await fetch(`/api/v1/users/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(user),
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include'
            })
            const result = await response.json();
            if (result.status === 'success') {
                dispatch(getUser(user));
                document.getElementById('fileInput').value = ''
            }
        } catch (err) {
            return console.log(err);
        }
    }
    const changePassword = async () => {
        try {
            if (!password && confirmPassword && password !== confirmPassword) {
                return alert('Passwords do not match');
            }
            const body = {
                newPassword: password,
                confirmPassword: confirmPassword
            }
            const response = await fetch(`/api/v1/auth/changePassword/${id}`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include'
            })
            const result = await response.json();
            if (result.status === 'success') {
                setPassword('');
                setConfirmPassword('');
                setChange(false);
            }
        } catch (err) {
            return console.log(err);
        }
    }
    return (
        <div id="user_details">
            {user.picture && <>
                <div id="user_profile">
                    {image ? <img className="previewProfile" style={{ height: '150px', width: '150px', objectFit: 'cover', borderRadius: '50%' }} src={image} alt="Preview" /> :
                        <img className="previewProfile" style={{ height: '150px', width: '150px', objectFit: 'cover', borderRadius: '50%' }} src={`/img/profile/${user.picture}`} alt="Cant reach" />}
                    <input type="file" onChange={picturePreview} id="fileInput" accept="image/png, image/jpg, image/jpeg" />
                    <button type="button" onClick={handleUpload}>Submit</button>
                </div>
                <div>
                    <span>
                        <label htmlFor="">Full Name</label>
                        <input type="text" value={user.fullName} onChange={(e) => { setUser({ ...user, fullName: e.target.value }) }} required id="user_info" />
                    </span>
                    <span>
                        <label htmlFor="">Email</label>
                        <input type="text" onChange={(e) => { setUser({ ...user, fullName: e.target.value }) }} value={user.email} required id="user_info" />
                    </span>
                </div>
                <div id="user_pass">
                    <div>
                        <h1>Password</h1>
                        <button type="button" onClick={() => { setChange(!change) }}>Change Password</button>
                    </div>
                    {change ? <div>
                        <span>
                            <label htmlFor="">Password</label>
                            <input type="password" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </span>
                        <span>
                            <label htmlFor="">Re-Type Password</label>
                            <input type="password" required value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                        </span>
                        <button type="button" onClick={changePassword}>Submit</button>
                    </div> : null}
                </div>
            </>}

        </div>
    )
}