import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import GetTasks from '../tasks/GetTasks'

const Welcome = () => {
    const navigate = useNavigate();

    const handleCreateClick = () =>{
        navigate('/CreateTask')
    }
  return (
   <>
    <h1>Welcome to your ToDo Manager </h1>
    <Button onClick={handleCreateClick} > Create Task</Button>
    <GetTasks/>
   </>
  )
}

export default Welcome