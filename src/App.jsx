import { useState } from 'react'
// Components
import Authenticate from './Components/Authenticate'
import SignUpForm from './Components/SignUpForm'
import './App.css'

function App() {
   const [token, setToken] = useState(null);

  return (
    <>
   <Authenticate token={token}/>
   <SignUpForm setToken={setToken} />
    </>
  )
}

export default App
