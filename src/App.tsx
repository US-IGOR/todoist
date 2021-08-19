import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";

function App() {
    console.log('git')
    let [task, setTask] = useState([
        {id: v1(), tasks: 'bear', isDone: true},
        {id: v1(), tasks: 'milk', isDone: false},
        {id: v1(), tasks: 'water', isDone: true}
    ]);

    function addNewTask(titleTodolist: string) {
        let newTask = {id: v1(), tasks: titleTodolist, isDone: true}
        let newArrayTasks = [newTask, ...task]
        setTask(newArrayTasks)
    }
    function remove(x: string) {
        let delTask = task.filter(f => f.id != x);
        setTask(delTask)
    }
    function changeStatus(id: string, isDone: boolean) {

        let findTaskStatus = task.find(f => f.id === id)
        if (findTaskStatus) {
            findTaskStatus.isDone = isDone;}
            setTask([...task]);
        }

        let [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
        let filteredTodolist = task;
        if (filter === 'active') {
            filteredTodolist = task.filter(f => f.isDone === false);
        }
        if (filter === 'completed') {
            filteredTodolist = task.filter(f => f.isDone === true);
        }

        const changeFilter = (value: 'all' | 'active' | 'completed') => {
            return (
                setFilter(value)
            )
        }



        return (
            <div className="App">
                <Todolist title={'What to by'}
                          data={filteredTodolist}
                          remove={remove}
                          changeFilter={changeFilter}
                          addNewTask={addNewTask}
                          changeStatus={changeStatus}
                          filter={filter}
                />


            </div>
        );
    }


    export default App;
