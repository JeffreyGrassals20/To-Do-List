import { Box, Button } from '@mui/material'
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
   <Box>
        <Box p={3}>
            <h1>Welcome to your ToDo Manager </h1>

        </Box>
        <Box pl={3}>
            <Button color='primary' variant='contained' onClick={handleCreateClick} > Create Task</Button>
        </Box>
   </Box>
  
    <GetTasks/>
   </>
  )
}

export default Welcome