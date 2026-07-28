import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './HomePage.css'
import NavBar from './NavBar.jsx'



function HomePage() {
    const navigate = useNavigate();
    const [quoteCount, setquoteCount] = useState(0)
    const [personCount, setPersonCount] = useState(0)
    const [quotesByPerson, setQuotesByPerson] = useState([])

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
        fetchPersonCount()
        fetchQuotesByPerson()
    }, [quoteCount])

    const fetchQuoteCount = async () => {
        console.log("fetching QuoteCount")
        try {
            const res = await fetch(`http://localhost:3000/api/GetQuoteCount/${localStorage.getItem('userId')}`)
            const data = await res.json()
            // console.log(data[0].count)
            setquoteCount(data[0].count)
        } catch (err) {
            console.error(err)
        }
    }

    const fetchQuotesByPerson = async () => {
        console.log("fetching QuoteCount")
        try {
            const res = await fetch(`http://localhost:3000/api/GetQuotesByPeople/${localStorage.getItem('userId')}`)
            const data = await res.json()
            console.log("quotesbyperson")
            console.log(data)
            setQuotesByPerson(data)
        } catch (err) {
            console.error(err)
        }
    }



    const fetchPersonCount = async () => {
        console.log("fetching PersonCount")
        try {
            const res = await fetch(`http://localhost:3000/api/GetPersonCount/${localStorage.getItem('userId')}`)
            const data = await res.json()
            // console.log(data[0].count)
            setPersonCount(data[0].count)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="overallPage">
            <NavBar />
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
                            Quote Count By Person
                        </h4>
                        <p>
                            You have {quoteCount} Quotes from {personCount} People
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Rank:
                                    </th>
                                    <th>
                                        Person:
                                    </th>
                                    <th>
                                        NumQuotes:
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {quotesByPerson.map((current, x) => (
                                    <tr key={x}>
                                        <td>
                                            {x}
                                        </td>
                                        <td>
                                            {current.name}
                                        </td>
                                        <td>
                                            {current.count}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* <input type="text" /> */}

                    </div>
                    <div className="options-element">
                        <h4>
                            Random Quote
                        </h4>
                        <table>
                            <th>Text</th>
                            <th>By</th>
                            <tr>
                                <td>Quote1</td>
                                <td>Author1</td>
                            </tr>
                        </table>
                        <h4>On</h4>
                    </div>
                </div>
                <div>
                    <input
                        type="Button"
                        defaultValue={"Logout"}
                        onClick={goToSignIn} />
                </div>
            </div>
        </div>

    )
}

export default HomePage;