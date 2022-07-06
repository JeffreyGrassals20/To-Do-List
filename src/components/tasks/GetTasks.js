import React, { useEffect, useState } from 'react'
import { getDatabase, ref,child, get , onValue} from 'firebase/database';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../../firebase/firebase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, Card, CardActions, CardContent } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: 5,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const GetTasks = () => {

    const [taskList, setTaskList] = useState([])

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
            }
        })
    }

    function FormRow() {
      return (
        <React.Fragment>
        {
            taskList.map((task) => 
            <Grid key={task.id}item xs={4}>
                <Paper key={task.id}className={classes.paper}>{task.tittle}</Paper>
                <Card>
                    <CardContent>
                        <h6>{task.body}</h6>
                    </CardContent>
                    <CardActions>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </CardActions>
                </Card>
            </Grid>)
        }
        </React.Fragment>
      );
    }

    const classes = useStyles();


  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  )
}

export default GetTasks