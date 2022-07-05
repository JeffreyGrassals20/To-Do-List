import React from 'react'
import { Button } from '@mui/material';
import { ref, set } from 'firebase/database';
import { db } from '../../firebase/firebase';
import { uid } from 'uid';



const addData = () => {
    const date = Date.now()
    const taskId = uid();
    set(ref(db,`${'toDoList/'} ${taskId}`),{
        id: taskId,
        tittle: 'Enviar Correo',
        body: 'Enviar Correo A fulano el loco',
        date: date.toLocaleString('en-US')
    }).then(()=> {
        alert('Task Created')
    });
}

const CreateTask = () => {
  return (
    <>
        <Button onClick={addData}> Crear Task </Button>
    </>
  )
}

export default CreateTask