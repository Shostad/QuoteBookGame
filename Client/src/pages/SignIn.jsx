import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './SignUp.css'



function SignIn() {
    const navigate = useNavigate();
    const goToSignUp =() => {
        navigate("/SignUp")
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
                        defaultValue={'Name'} />
                </div>
                <div>
                    <input type="text"
                        name=""
                        id=""
                        defaultValue={'Password'} />
                </div>
                <div className="flexBox">
                    <p>Submit</p>
                    <input type="button" />
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