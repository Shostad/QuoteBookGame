import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './AddQuote.css'



function AddQuote() {
    const navigate = useNavigate();
    const [currentQuoter, setCurrentQuoter] = useState('')
    const [peopleList, setPeopleList] = useState([])
    const [currentQuote, setCurrentQuote] = useState('')
    const goToHomePage = () => {
        navigate("/HomePage")
    }
    const goToAddQuote = () => {
        navigate("/")
    }
    const updateCurrentQuoter = async (event) => {
        setCurrentQuoter(event.target.value)
        console.log(event.target.value)
    }
    const updateCurrentQuote = async (event) => {
        setCurrentQuote(event.target.value)
        console.log(event.target.value)
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
        console.log(currentQuoter)
        console.log(!peopleList.map(a => a.name).includes(currentQuoter.trim()))
        if (!peopleList.map(a => a.name).includes(currentQuoter.trim())) {
            console.log('Adding New Person')
            try {
                const res = await fetch('http://localhost:3000/api/AddPerson', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: currentQuoter,
                        createdBy: localStorage.getItem('userId')
                    })
                }) 
                console.log(res.status)
            } catch (err) {
                console.error(err)
            }
        }
        try {
                const res = await fetch('http://localhost:3000/api/AddQuote', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        text: currentQuote,
                        createdBy: localStorage.getItem('userId')
                    })
                })
                console.log(res.status)
            } catch (err) {
                console.error(err)
            }
    };

    useEffect(() => {

        fetchPeople()
    }, [currentQuoter]);

    return (
        <div>
            <h1>
                El AddQuote
            </h1>
            <input
                type="text"
                defaultValue={"Quote"} 
                onChange={updateCurrentQuote}/>
            <input list="quoterNames" id="quoterList" name="quoterList" onChange={updateCurrentQuoter} />
            <datalist name="quoter" id="quoterNames">
                {peopleList.map((current, x) => (
                    <option 
                        value={current.name}
                        id={x}
                        key={"option"+x}
                    ></option>
                ))}
            </datalist>
            <input
                type="button"
                onClick={submitQuote} 
                defaultValue={"Submit"}/>
            <div>
                <input
                    type="Button"
                    defaultValue={"Home"}
                    onClick={goToHomePage} />
            </div>
        </div>

    )
}

export default AddQuote;