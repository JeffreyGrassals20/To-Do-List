import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
    const navigate = useNavigate();

    const handleCreateClick = () =>{
        navigate('/CreateTask')
    }
  return (
   <>
    <h1>Home Page</h1>
    <Button onClick={handleCreateClick} > Create</Button>
   </>
  )
}

export default Welcome