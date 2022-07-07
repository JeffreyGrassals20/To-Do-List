import { Alert, Button, Typography } from '@mui/material'
import React from 'react'
import { remove, ref} from 'firebase/database';
import { db } from '../../firebase/firebase';
import { useStyles } from '../../styles/DeleteTask';
import { Delete } from '@mui/icons-material';
import { Box } from '@mui/system';
const DeleteTaskAlert = ({id, onClose}) => {

    const style = useStyles()

    const deleteTask = (id)=>{
        remove(ref(db,`${'toDoList/'} ${id}`)).then(()=> {
            onClose()
        }).catch((error)=> {
            alert(error.message)
        });
    }


    return (
    <div className={style.modal}>
        <Alert  severity='error'>
            <Box>
                <Typography>
                    Delete this Task?
                </Typography>
            </Box>
            <Box mt={2}>
                <Button 
                size='small'
                variant='contained' 
                color='inherit'
                startIcon={<Delete/>} 
                onClick={() => deleteTask(id)}> Delete
                </Button>

                <Button size='small' 
                variant='outlined'
                onClick={() => onClose()}
                color='inherit'
                style={{marginLeft: 100}}>
                    Close
                </Button>
            </Box>
        </Alert>
    </div>
  )
}

export default DeleteTaskAlert