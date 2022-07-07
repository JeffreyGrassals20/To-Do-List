import React, { useState } from 'react'
import { Button, Input, TextField } from '@mui/material';
import { ref, set } from 'firebase/database';
import { db } from '../../firebase/firebase';
import { uid } from 'uid';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { useStyles } from '../../styles/CreateTask';

const CreateTask = () => {

const [tittle, setTittle] = useState('')
const [body, setBody] = useState('')
const [dueDate, setDueDate] = useState('')
const [disableButtom, setDisableButtom] = useState(false)
const navigate = useNavigate();
const style = useStyles()


const addData = (tittle, body,_dueDate) => {
    const date = new Date(Date.now()).toLocaleString('en-US')
    const dueDate = new Date(_dueDate).toLocaleString('en-US')
    const taskId = uid();
    set(ref(db,`${'toDoList/'} ${taskId}`),{
        id: taskId,
        tittle: tittle,
        body: body,
        createdAt: date,
        date: dueDate,
        completed: false,

    }).catch((error)=> {
        alert(error.message)
    });
}

const handleTittle = (e) =>{
    setTittle(e.target.value);
}

const handleBody = (e) => {
    setBody(e.target.value); 
}
const handleDueDate= (e)=> {
    setDueDate(e.target.value)
}
const handleSubmit = () => {
    if(!tittle){
        return(alert("The field tittle is required"))
    }else if(!body){
        return(alert("The field body is required"))
    }else if (!dueDate){
        return(alert("The field Due Date is required"))
    }
    addData(tittle,body,dueDate)
    navigate('/')
}

return (
    <>
        <Box p={{xs: 1, sm: 3, md: 10}} textAlign='center'>
            <h1>Create Task</h1>
            <Box pt={2}>
                <TextField 
                required 
                error={!tittle}
                helperText={
                    !tittle ? 'Required': '' 
                } 
                label='Tittle' 
                className={style.textField} 
                placeholder='Tittle' 
                onChange={handleTittle}/>
            </Box>
            <Box pt={5}>
                 <TextField 
                 required 
                 error={!body}
                 helperText={
                     !tittle ? 'Required': '' 
                 }  
                 multiline 
                 label='Content' 
                 className={style.textField} 
                 placeholder='Content' 
                 onChange={handleBody}/>
            </Box>

            <Box pt={5}>
                <form>
                    <TextField
                        id="date"
                        required 
                        error={!dueDate}
                        helperText={
                            !tittle ? 'Required': '' 
                        } 
                        label="Due Date"
                        type="datetime-local"
                        className={style.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange= {handleDueDate}
                    />
                </form>
            </Box>
            <Box pt={3}>
                <Button disabled={disableButtom} color='primary' variant='contained' onClick={handleSubmit}> Create </Button>
            </Box>               
        </Box>
    </>
  )
}

export default CreateTask