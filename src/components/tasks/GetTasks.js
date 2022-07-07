import React, { useEffect, useState } from 'react'
import { getDatabase, ref,child, get , onValue} from 'firebase/database';
import { db } from '../../firebase/firebase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, Card, CardActions, CardContent, Checkbox } from '@mui/material';
import EditTask from './EditTask';
import { Modal } from '@mui/material'
import { useStyles } from '../../styles/GetTasks';

const GetTasks = () => {

    const [taskList, setTaskList] = useState([])
    const [open, setOpen] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const classes = useStyles();

    useEffect(() => {
        getTasks()
    }, [])
    
    // useEffect(()=> {
    //     printTask()
    // }, [taskList])

    // const getTasks = () =>{
    //     const dbRef = ref(getDatabase())
    //     get(child (dbRef, `toDoList/`)).then((snapshot) => {
    //         if(snapshot.exists()){
    //             const data = snapshot.val();
    //             setTaskList(Object.values(data))
    //         }else{
    //             console.log('No Data')
    //         }
    //     }).catch((error) => {
    //         alert(error.message)
    //     })
    //     printTask()
    // }

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

    const handleOpen= (selectedTask) =>{
        setTaskToEdit(selectedTask)
        setOpen(!open)
    }

    const TaskRow = () =>{
      return (
        <React.Fragment>
        {
            taskList.map((task) => 
            
            <Grid key={task.id}item xs={4}>
                <Paper key={task.id}className={classes.paper}>{task.tittle}</Paper>
                <Card>
                    <CardContent>
                        <h6>{task.body}</h6>
                        <h6>{task.date}</h6>
                        <h6>{String(task.completed)}</h6>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => handleOpen(task)}>Edit</Button>
                        <Button>Delete</Button>
                        <Checkbox checked = {isChecked} />
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
    </div>
    </>
  )
}

export default GetTasks