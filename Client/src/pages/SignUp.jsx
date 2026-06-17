import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './SignUp.css'

function SignUp() {
    const navigate = useNavigate();
    const [currentUserName,setCurrentUserName] = useState('')
    const [currentPassword,setCurrentPassword] = useState('')

    const updateUserName = (event) => {
        setCurrentUserName(event.target.value)
    }

    const updatePassword = (event) => {
        setCurrentPassword(event.target.value)
    }

    const backToSignIn = () => {
        navigate('/')
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
            backToSignIn()
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
                <div>
                    <input 
                        type="button"
                        defaultValue={'Back to SignIn'} 
                        onClick={backToSignIn}/>
                </div>
            </div>
        </div>

    )
}

export default SignUp;