

import React, { useEffect, useState } from 'react'
import { getDatabase, ref,child, get , onValue,update} from 'firebase/database';
import { db } from '../../firebase/firebase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, Card, CardActions, CardContent, Checkbox } from '@mui/material';
import EditTask from './EditTask';
import { Modal } from '@mui/material'
import { useStyles } from '../../styles/GetTasks';
import DeleteTaskAlert from './DeleteTaskAlert';


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
            <Grid key={task.id}item xs={12} sm={6}>
                <Paper key={task.id}className={classes.paper}>{task.tittle}</Paper>
                <Card >
                    <CardContent>
                        <h6>{task.body}</h6>
                        <h6>{task.date}</h6>
                        <h6>{String(task.completed)}</h6>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => handleOpen(task)}>Edit</Button>
                        <Button onClick={() => handleDelete(task.id)} >Delete</Button>
                        <Checkbox defaultChecked={task.completed} onChange={()=>handleChangeChecked(task.id, task.completed)} />
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
        <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
                <TaskRow />
            </Grid>
        </Grid>
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