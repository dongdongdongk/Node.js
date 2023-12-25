import { useState } from 'react'
import './App.css'
import UsernameForm from './UsernameForm'
import SignUpForm from './SignupForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignUpForm />
    </>
  )
}

export default App
