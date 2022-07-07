

import React, { useEffect, useState } from 'react'
import { getDatabase, ref,child, get , onValue,update} from 'firebase/database';
import { db } from '../../firebase/firebase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, Card, CardActions, CardContent, CardHeader, Checkbox, Divider, responsiveFontSizes, TextareaAutosize, TextField, Typography } from '@mui/material';
import EditTask from './EditTask';
import { Modal } from '@mui/material'
import { useStyles } from '../../styles/GetTasks';
import DeleteTaskAlert from './DeleteTaskAlert';
import { Box } from '@mui/system';



const GetTasks = () => {

    const [taskList, setTaskList] = useState([])
    const [open, setOpen] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [taskToDelete, setTaskToDelete] = useState('')

    const classes = useStyles();

    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = () => {
        onValue(ref(db, `toDoList/`), (snapshot) => {
            setTaskList([]);
            const data = snapshot.val(); 
            if(data){
                Object.values(data).map((todo) => {
                    setTaskList((old) => [...old, todo]);
                })
            }else{
                alert("there Is No data to Show")
            }
        })
    }

    const updateTaskStatus = (id, isComplete) => {
        update(ref(db,`${'toDoList/'} ${id}`),{
           completed: !isComplete
        }).catch((error)=> {
            alert(error.message)
        });
    }
    const handleOpen= (selectedTask) =>{
        setTaskToEdit(selectedTask)
        setOpen(!open)
    }

    const handleChangeChecked = (id, isComplete)=> {
        updateTaskStatus(id, isComplete)
    }

    const handleDelete = (id) =>{
        setTaskToDelete(id)
        setOpenDeleteModal(true)
    }

    const TaskRow = () =>{
      return (
        <React.Fragment>
        {
            taskList.map((task) => 
            <Grid key={task.id}item xs={12} sm={6} md={4}>
                <Card >
                    <Box textAlign='center'>
                        <Typography variant='h6'>{task.tittle}</Typography>
                    </Box>
                    <CardContent>
                        <Box pt={1}>
                            <Typography variant='inherit' fontSize={15} color='textSecondary'>Created At:</Typography>
                            <Typography variant='h6' color='secondary' fontSize={12}>{task.createdAt}</Typography>
                        </Box>
                        <Box pt={2}>
                            <Typography variant='inherit' fontSize={15} color='textSecondary'>Due To:</Typography>
                            <Typography variant='h6' color='secondary' fontSize={12}>{task.date}</Typography>
                        </Box>
                        <Divider/>

                        <Box xs={12} pt={1}textAlign='center'>
                            <h5>Content</h5>
                           <TextareaAutosize
                            defaultValue={task.body}
                            maxRows={4}
                            aria-label="maximum height"
                            disabled
                            className={classes.textArea}
                            />
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button size= 'small' color='primary'onClick={() => handleOpen(task)}>Edit</Button>
                        <Button size='small'color='error'onClick={() => handleDelete(task.id)} >Delete</Button>
                        
                            <h6 className={classes.checkBox}>Is Completed</h6>
                            <Checkbox 
                            className={classes.checkBox}
                            defaultChecked={task.completed} 
                            onChange={()=>handleChangeChecked(task.id, task.completed)} /> 
                    </CardActions>
                </Card>
            </Grid>)
        }
        </React.Fragment>
      );
    }


  return (
    <>
    <div className={classes.root}>
        <Box p={8}>
            <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                    <TaskRow />
                </Grid>
            </Grid>
        </Box>
        <Modal open={open}>
            <div>
                <EditTask selectedTask={taskToEdit} onClose={() => setOpen(!open)}/>
            </div>
        </Modal>
        {taskToDelete && 
        
            <Modal open={openDeleteModal}>
                <div>
                    <DeleteTaskAlert id = {taskToDelete} onClose={()=> setOpenDeleteModal(false)}/>
                </div>
            </Modal>
        }
    </div>
    </>
  )
}

export default GetTasks