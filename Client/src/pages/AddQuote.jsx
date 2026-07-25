import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './AddQuote.css'



function AddQuote() {
    const navigate = useNavigate();
    const [quoters, setQuoters] = useState([''])
    const [peopleList, setPeopleList] = useState([])
    const [quotes, setQuotes] = useState([''])
    const goToHomePage = () => {
        navigate("/HomePage")
    }
    const goToAddQuote = () => {
        navigate("/")
    }

    const updateQuoter = async (event, index) => {
        console.log(typeof (event.target.value), index)
        let quotersCopy = quoters
        quotersCopy.splice(index, 1, event.target.value)
        setQuoters(quotersCopy)
        console.log(quotes, quoters, index)
    }

    const updateQuote = async (event, index) => {
        console.log(typeof (event.target.value), index)
        let quoteCopy = quotes
        quoteCopy.splice(index, 1, event.target.value)
        setQuotes(quoteCopy)
        console.log(quotes, quoters, index)
    }

    const addLine = async (event) => {
        // setQuotes(quotes.append(''))
        let quoteCopy = quotes
        quoteCopy.push('')
        setQuotes(Array.from(quoteCopy))

        let quotersCopy = quoters
        quotersCopy.push('')
        setQuoters(Array.from(quotersCopy))

        console.log(quotersCopy)
        console.log(typeof (quotersCopy))
    }

    const fetchPeople = async () => {
        console.log("fetching People")
        try {
            const res = await fetch(`http://localhost:3000/api/GetPeople/${localStorage.getItem('userId')}`)
            const data = await res.json()
            // navigate('/')
            // console.log(res)
            console.log(data)
            setPeopleList(data)
        } catch (err) {
            console.error(err)
        }
    }

    const submitQuote = async () => {
        console.log(peopleList.map(a => a.name))
        // console.log(currentQuoter)
        // console.log(!peopleList.map(a => a.name).includes(currentQuoter.trim()))
        for (const current of quoters) {
            if (!peopleList.map(a => a.name).includes(current.trim())) {
                console.log('Adding New Person')
                try {
                    const res = await fetch('http://localhost:3000/api/AddPerson', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: current,
                            created_by: localStorage.getItem('userId')
                        })
                    })
                    console.log(res.status)
                } catch (err) {
                    console.error(err)
                }
            }
        }
        try {
            const res = await fetch('http://localhost:3000/api/AddQuote', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lines: quotes,
                    people: quoters,
                    created_by: localStorage.getItem('userId'),
                    date: '01/01/28'
                })
            })
            console.log(typeof (quotes))
            console.log(quotes)
            console.log(quoters)
        } catch (err) {
            console.error(err)
        }
    };

    useEffect(() => {

        fetchPeople()
    }, [quoters]);


    return (
        <div>
            <h1>
                El AddQuote
            </h1>
            {quotes.map((currentQuote, y) => (
                <div>
                    <input
                        type="text"
                        key={`textinput ${y}`}
                        defaultValue={currentQuote}
                        onChange={() => updateQuote(event, y)}
                    />
                    <input
                        list="quoterNames"
                        id="quoterList"
                        name="quoterList"
                        onChange={() => updateQuoter(event, y)} />
                    <datalist name="quoter" id="quoterNames">
                        {peopleList.map((current, x) => (
                            <option
                                value={current.name}
                                id={x}
                                key={"option" + x}
                            ></option>
                        ))}
                    </datalist>
                </div>
            ))}

            <div>
                <input
                    type="button"
                    defaultValue={"Add Line"}
                    onClick={addLine} />
                <input
                    type="button"
                    onClick={submitQuote}
                    defaultValue={"Submit"} />
                <input
                    type="Button"
                    defaultValue={"Home"}
                    onClick={goToHomePage} />
            </div>
        </div>

    )
}

export default AddQuote;