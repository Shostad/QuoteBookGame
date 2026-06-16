import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useEffect } from 'react'

function App() {
  
  const [count, setCount] = useState(0)
  const [people, setPeople] = useState([])

  // useEffect(() => {
    const fetchPeople = async () => {
      console.log('fetching people')
      try {
        const res = await fetch('http://localhost:3000/api/users')
        const data = await res.json()
        console.log(data)
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }
  
// )

  return (

    <html lang="en">

      <head>
        {/* <link href="./style.css" rel="stylesheet"> */}
        <title>Quote Book Game</title>
      </head>

      <body>
        <h1>Quote Book Game</h1>
        <p className="mainParagraph">
          This is the quote book game, it doesnt work yet but gizza bit of time and it'll be all good.
        </p>

        <input 
          type="button" 
          onClick = {fetchPeople}/>


      </body>

    </html>
  )
}

export default App
