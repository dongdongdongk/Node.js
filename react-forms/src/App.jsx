import { useState } from 'react'
import './App.css'
import UsernameForm from './UsernameForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UsernameForm />
    </>
  )
}

export default App
