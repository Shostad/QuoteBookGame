import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './HomePage.css'



function HomePage() {
    const navigate = useNavigate();
    const goToSignIn = () => {
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        navigate("/")
    }
    const goToAddQuote = () => {
        navigate("/AddQuote")
    }

    return (
        <div>
            <h1>
                El Homepage
            </h1>
            <h3>
                Welcome back {localStorage.getItem('userName')}
            </h3>
            <div className = 'options-layout'> 
                <div className="options-element">
                    <h4>
                        Quote Analysis
                    </h4>
                    <p>
                        Add New Quote:
                    </p>
                    <input 
                        type="button" 
                        onClick={goToAddQuote}
                    />
                </div>
                <div>
                    <h4>
                        Play Game
                    </h4>
                </div>
            </div>
            <div>
                <input
                    type="Button"
                    defaultValue={"Logout"}
                    onClick={goToSignIn} />
            </div>
        </div>

    )
}

export default HomePage;