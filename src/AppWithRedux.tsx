import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {ArrayDataType, Todolist} from "./Todolist";
import {InputClones} from "./InputClones";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addNewTaskAC, changeStatusAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC, ChangeTodolistTitleAC,
    filterValueType,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type todolistsType = {
    id: string,
    title: string,
    filter: string
}
export type TasksStateType = {
    [key: string]: Array<ArrayDataType>
}

function AppWithRedux() {


    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<todolistsType>>(state => state.todoLists)
    const taskObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    //tasks_func's
    function addNewTask(titleTodolist: string, todoID: string) {
        dispatch(addNewTaskAC(titleTodolist, todoID))
    }

    function remove(taskID: string, todoID: string) {
        const action = removeTaskAC(taskID, todoID)
        dispatch(action)
    }

    function changeStatus(id: string, isDone: boolean, todoID: string) {
        dispatch(changeStatusAC(id, isDone, todoID))
    }

    function changeTitleTask(id: string, newTitle: string, todoID: string) {
        dispatch(changeTitleTaskAC(id, newTitle, todoID))
    }


    //toDOLists_func's
    const changeFilter = (filter: filterValueType, id: string) => {
        const action = ChangeTodolistFilterAC(filter, id)
        dispatch(action)
    }

    const deleteTodolist = (todoID: string) => {
        const action = RemoveTodolistAC(todoID)
        dispatch(action)
    }

    function addTodolist(title: string) {
        const action = AddTodolistAC(title)

        dispatch(action)

    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        dispatch(ChangeTodolistTitleAC(id, newTitle))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todoooo
                    </Typography>
                    {/*<Button color="inherit">Login</Button>*/}
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <InputClones addNewItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((m) => {

                            let filteredTodolist = taskObj[m.id];
                            if (m.filter === 'active') {
                                filteredTodolist = filteredTodolist.filter(f => !f.isDone);
                            }
                            if (m.filter === 'completed') {
                                filteredTodolist = filteredTodolist.filter(f => f.isDone);
                            }
                            return <Grid item>
                                <Paper elevation={10} style={{padding: "10px"}}>
                                    <Todolist title={m.title}
                                              key={m.id}
                                              data={filteredTodolist}
                                              remove={remove}
                                              changeFilter={changeFilter}
                                              addNewTask={addNewTask}
                                              changeStatus={changeStatus}
                                              filter={m.filter}
                                              id={m.id}
                                              deleteTodolist={deleteTodolist}
                                              changeTodolistTitle={changeTodolistTitle}
                                              changeTitleTask={changeTitleTask}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


export default AppWithRedux;
