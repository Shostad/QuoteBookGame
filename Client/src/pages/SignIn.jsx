import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './SignUp.css'



function SignIn() {
    const [currentUserName,setCurrentUserName] = useState('')
    const [currentPassword,setCurrentPassword] = useState('')
    const [incorrectInput,setIncorrectInput] = useState(false)

    const updateUserName = (event) => {
        setCurrentUserName(event.target.value)
    }

    const updatePassword = (event) => {
        setCurrentPassword(event.target.value)
    }

    

    const navigate = useNavigate();
    const goToSignUp =() => {
        navigate("/SignUp")
    }
    const goToHomePage =() => {
        navigate("/HomePage")
    }

    const verifyLoginDetails = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/SignIn/${currentUserName}/${currentPassword}`)
            const data = await res.json()
            // navigate('/')
            // console.log(res)
            console.log(data)
            if(data.length ==0){
                setIncorrectInput(true)
            }else{
                setIncorrectInput(false)
                localStorage.setItem('userId',data[0].id)
                localStorage.setItem('userName',data[0].name)
                goToHomePage()
            }
            console.log(localStorage)
            console.log(incorrectInput)
        }catch (err) {
            console.error(err)
        }
    }
    return (
        <div>
            <h1>
                SignIn
            </h1>
            <div className='signUpBox'>
                <div>
                    <input
                        type="text"
                        defaultValue={'Name'}
                        onChange={updateUserName} />
                </div>
                <div>
                    <input type="text"
                        name=""
                        id=""
                        defaultValue={'Password'}
                        onChange={updatePassword} />
                </div>
                <div>
                    <p>{incorrectInput ? "Incorrect Username or password :[":""}</p>
                </div>
                <div className="flexBox">
                    <p>Submit</p>
                    <input type="button" 
                    onClick={verifyLoginDetails}/>
                </div>
                <div>
                    <p>SignUp</p>
                    <input type="button"
                    onClick={goToSignUp}/>
                </div>
            </div>
        </div>

    )
}

export default SignIn;