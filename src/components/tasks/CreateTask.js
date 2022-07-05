import React, { useState } from 'react'
import { Button, Input, TextField } from '@mui/material';
import { ref, set } from 'firebase/database';
import { db } from '../../firebase/firebase';
import { uid } from 'uid';


const CreateTask = () => {

const [tittle, setTittle] = useState('')
const [body, setBody] = useState('')
const [dueDate, setDueDate] = useState('')

const addData = (tittle, body,_dueDate) => {
    
    const date = new Date(Date.now()).toLocaleString('en-US')
    const taskId = uid();
    set(ref(db,`${'toDoList/'} ${taskId}`),{
        id: taskId,
        tittle: tittle,
        body: body,
        createdAt: date,
        date: _dueDate
    }).then(()=> {
        alert('Task Created')
    });
}

const handleTittle = (e) =>{
    setTittle(e.target.value);
}

const handleBody = (e) => {
    setBody(e.target.value); 
}

const handleSubmit = () => {
    addData(tittle,body,dueDate)
}
const handleDueDate= (e)=> {
    setDueDate(e.target.value)
}
return (
    <>
        
        <Input id='tittle' placeholder='tittle' onChange={handleTittle}/><br/>
        <Input id='body' placeholder='body' onChange={handleBody}/><br/>

        <form style={{marginTop: 80}} noValidate>
            <TextField
                id="date"
                label="Fecha"
                type="datetime-local"
                InputLabelProps={{
                shrink: true,
                }}
                onChange= {handleDueDate}
            />
        </form>
        
        <Button onClick={handleSubmit}> Crear Task </Button>
    </>
  )
}

export default CreateTask