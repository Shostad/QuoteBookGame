import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './NavBar.css'



function NavBar() {
    const navigate = useNavigate();

    const goToSignIn = () => {
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        navigate("/")
    }
    const goToAddQuote = () => {
        navigate("/AddQuote")
    }
    const goToHomePage = () => {
        navigate("/HomePage")
    }

    return (
        <div className="main">
            <input
                type="button"
                value="Quote Analysis"
                onClick={goToHomePage}
            />
            <input
                type="button"
                value="Add New Quote"
                onClick={goToAddQuote}
            />
            <input
                type="button"
                value="Play Game"
            />
        </div>

    )
}

export default NavBar;