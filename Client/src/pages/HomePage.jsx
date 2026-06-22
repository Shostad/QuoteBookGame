import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './HomePage.css'



function HomePage() {
    const navigate = useNavigate();
    const [quoteCount, setquoteCount] = useState(0)
    const goToSignIn = () => {
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        navigate("/")
    }
    const goToAddQuote = () => {
        navigate("/AddQuote")
    }

    useEffect(() => {
        fetchQuoteCount()
    },[quoteCount])

    const fetchQuoteCount = async () => {
        console.log("fetching QuoteCount")
        try {
            const res = await fetch(`http://localhost:3000/api/GetQuoteCount/${localStorage.getItem('userId')}`)
            const data = await res.json()
            console.log(data[0].count)
            setquoteCount(data[0].count)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h1>
                El Homepage
            </h1>
            <h3>
                Welcome back {localStorage.getItem('userName')}
            </h3>
            <div className='options-layout'>
                <div className="options-element">
                    <h4>
                        Quote Analysis
                    </h4>
                    <p>
                        You have {quoteCount} Quotes
                    </p>

                </div>
                <div className="options-element">
                    <h4>
                        Add New Quote:
                    </h4>
                    <input
                        type="button"
                        onClick={goToAddQuote}
                    />
                </div>
                <div className="options-element">
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