import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useStyles } from '../../styles/EditModal';
import { update,ref } from 'firebase/database';
import { db } from '../../firebase/firebase';
import { isEmpty } from '@firebase/util';

const EditTask = ({selectedTask,onClose}) => {
  const style = useStyles();
  const [tittle, setTittle] = useState(null)
  const [body, setBody] = useState(null)
  const [dueDate, setDueDate] = useState(null)

    const handleDueDate = (e) => {
        setDueDate(e.target.value)
    }
    const handleTittle = (e) =>{
        setTittle(e.target.value);
    }
    const handleBody = (e) => {
        setBody(e.target.value); 
    }

    const handleSubmit = () =>{
        updateTask(selectedTask.id,tittle, body, dueDate)
    }

    const updateTask = (id,_tittle, _body, _dueDate) => {
        
        if(!_tittle) _tittle = selectedTask.tittle
        if(!_body) _body = selectedTask.body
        if(!_dueDate) _dueDate = selectedTask.date
        
        update(ref(db,`${'toDoList/'} ${id}`),{
            tittle: _tittle,
            body: _body,
            date: _dueDate,
        }).then(()=> {
            onClose()
        }).catch((error)=> {
            alert(error.message)
        });
    }


  return (
    <div>
        <div className={style.modal}>
            <div align='center'>
                <h1>{selectedTask.tittle}</h1>
                <Box m={2}>
                     <TextField xs={4} onChange={handleTittle} defaultValue={selectedTask.tittle} className={style.textField} label='Titulo'/>
                </Box>
                <Box m={2}>
                     <TextField multiline defaultValue={selectedTask.body} onChange={handleBody}className={style.textField} label='Contenido'/>
                </Box>
                <Box m={2}>
                    <form  noValidate>
                        <TextField
                            className={style.textField}
                            id="date"
                            defaultValue={selectedTask.date}
                            label="Fecha Final"
                            type="datetime-local"
                            InputLabelProps={{ 
                            shrink: true,
                            }}
                            onChange= {handleDueDate}
                        />
                    </form>                
                </Box>
                <Button onClick={() => handleSubmit()}> Actualizar</Button>
                <Button onClick={onClose}>Cerrar</Button>
            </div>
        </div>
    </div>
  )
}

export default EditTask