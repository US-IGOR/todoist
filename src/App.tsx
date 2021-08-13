import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


function App() {

    let [task, setTask] = useState([
        {id: 1, tasks: 'bear', isDone: true},
        {id: 2, tasks: 'milk', isDone: false},
        {id: 3, tasks: 'water', isDone: true}
    ]);

    function remove(x: number) {
        let delTask = task.filter(f => f.id != x);
        setTask(delTask)
    }

    let [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
    let filteredTodolist = task;
    if (filter === 'active') {
        filteredTodolist = task.filter(f => f.isDone === false);
    }
    if (filter === 'completed') {
        filteredTodolist = task.filter(f => f.isDone === true);
    }

    const changeFilter = (value:'all' | 'active' | 'completed') => {
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
            />


        </div>
    );
}


export default App;
