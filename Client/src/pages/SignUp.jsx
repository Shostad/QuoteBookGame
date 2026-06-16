import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './SignUp.css'

function SignUp() {
    const [currentUserName,setCurrentUserName] = useState('')
    const [currentPassword,setCurrentPassword] = useState('')

    const updateUserName = (event) => {
        setCurrentUserName(event.target.value)
    }

    const updatePassword = (event) => {
        setCurrentPassword(event.target.value)
    }

    const submitSignUp = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/SignUp',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: currentUserName,
                    password: currentPassword
                })
            })
            
        }catch (err) {
            console.error(err)
        }
    }
    return (
        <div>
            <h1>
                SignUp
            </h1>
            <div className='signUpBox'>
                <div>
                    <input
                        type="text"
                        defaultValue={'Name'} 
                        onChange={updateUserName}/>
                </div>
                <div>
                    <input type="text"
                        name=""
                        id=""
                        defaultValue={'Password'} 
                        onChange={updatePassword}/>
                </div>
                <div className="flexBox">
                    <p>Submit</p>
                    <input type="button" 
                    onClick={submitSignUp}/>
                </div>
            </div>
        </div>

    )
}

export default SignUp;