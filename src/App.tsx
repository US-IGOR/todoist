import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {ArrayDataType, Todolist} from "./Todolist";
import {InputClones} from "./InputClones";

function App() {

    type todolistsType = {
        id: string,
        title: string,
        filter: string
    }

    type TasksStateType = {
        [key:string]:Array<ArrayDataType>
    }

    let todolistID_1 = v1()
    let todolistID_2 = v1()


    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID_1, title: 'What to learn?', filter: 'all'},
        {id: todolistID_2, title: 'What to buy?', filter: 'active'}
    ])


    let [taskObj, setTask] = useState<TasksStateType>(
        {
            [todolistID_1]: [
                {id: v1(), title: 'css', isDone: true},
                {id: v1(), title: 'ts', isDone: false},
                {id: v1(), title: 'js', isDone: true}
            ],
            [todolistID_2]: [
                {id: v1(), title: 'bear', isDone: true},
                {id: v1(), title: 'milk', isDone: false},
                {id: v1(), title: 'water', isDone: true}
            ]
        });

    function addNewTask(titleTodolist: string,todoID:string) {
        let t=taskObj[todoID]
        let newTask = {id: v1(), title: titleTodolist, isDone: false}
        let newArrayTasks = [newTask, ...t];
        taskObj[todoID]=newArrayTasks
        setTask({...taskObj})
    }

    function remove(taskID: string,todoID:string) {
        let t=taskObj[todoID]
        let delTask = t.filter(f => f.id != taskID);
        taskObj[todoID]=delTask
        setTask( {... taskObj})
    }

    function changeStatus(id: string, isDone: boolean,todoID:string) {
        let t=taskObj[todoID]
        let findTaskStatus = t.find(f => f.id === id)
        if (findTaskStatus) {
            findTaskStatus.isDone = isDone;
        }
        setTask({...taskObj});
    }


    function changeTitleTask(id: string, newTitle: string,todoID:string) {
        let t=taskObj[todoID]
        let findTaskStatus = t.find(f => f.id === id)
        if (findTaskStatus) {
            findTaskStatus.title = newTitle;
        }
        setTask({...taskObj});
    }



    /* let [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')*/


    const changeFilter = (value: 'all' | 'active' | 'completed', id: string) => {

        let todo = todolists.find(tl => tl.id === id)
        if (todo) {
            todo.filter = value;
        }
        setTodolists([...todolists])

    }

    const deleteTodolist=(todoID:string)=>{
        let actualTodoLists=todolists.filter(f=> f.id !==todoID)
        setTodolists(actualTodoLists)
    }

    function addTodolist(title: string) {
        let todolist: todolistsType = {id: v1(), title: title, filter: 'all'}
        setTodolists([todolist, ...todolists])

        setTask({
            ...taskObj,
            [todolist.id]: []
        })
    }



    return (
        <div className="App">
            <InputClones addNewItem={addTodolist}/>
            {
                todolists.map((m) => {

                    let filteredTodolist = taskObj[m.id];
                    if (m.filter === 'active') {
                        filteredTodolist = filteredTodolist.filter(f => !f.isDone);
                    }
                    if (m.filter === 'completed') {
                        filteredTodolist = filteredTodolist.filter(f => f.isDone);
                    }
                    return <Todolist title={m.title}
                                     key={m.id}
                                     data={filteredTodolist}
                                     remove={remove}
                                     changeFilter={changeFilter}
                                     addNewTask={addNewTask}
                                     changeStatus={changeStatus}
                                     filter={m.filter}
                                     id={m.id}
                                     deleteTodolist={deleteTodolist}
                                    changeTitleTask={changeTitleTask}
                    />
                })
            }

        </div>
    );
}


export default App;
