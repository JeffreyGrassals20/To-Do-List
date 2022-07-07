import { Alert, Button } from '@mui/material'
import React from 'react'
import { remove, ref} from 'firebase/database';
import { db } from '../../firebase/firebase';

const DeleteTaskAlert = ({id, onClose}) => {

    const deleteTask = (id)=>{
        remove(ref(db,`${'toDoList/'} ${id}`)).then(()=> {
            onClose()
        }).catch((error)=> {
            alert(error.message)
        });
    }


    return (
    <div>
        <Alert variant='filled' severity='error'>
            Shure?
            <Button onClick={() => deleteTask(id)}> Delete</Button>
        </Alert>
    </div>
  )
}

export default DeleteTaskAlert