import React, {ChangeEvent, useState} from "react";
import {InputClones} from "./InputClones";
import {EditableSpan} from "./EditableSpan";

type TodolistProrsType = {
    title: string,
    remove: (x: string, todoID: string) => void,
    changeFilter: (value: 'all' | 'active' | 'completed', id: string) => void,
    data: Array<ArrayDataType>
    addNewTask: (titleTodolist: string, todoID: string) => void
    changeStatus: (id: string, isDone: boolean, todoID: string) => void
    changeTitleTask: (id: string, newValue: string, todoID: string) => void
    filter: string
    id: string
    deleteTodolist: (todoID: string) => void
}

export type ArrayDataType = {
    id: string;
    title: string
    isDone: boolean
}


export const Todolist = (props: TodolistProrsType) => {
    let [titleTodolist, setTitleTodolist] = useState<string>('')
    let [error, setError] = useState<string | null>('')


    const addNewTaskHandler = () => {
        if (titleTodolist.trim() !== '') {
            props.addNewTask(titleTodolist.trim(), props.id)
            setTitleTodolist('')
        } else setError('Error/ошибка')
    }


    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }

    const onRemoveTodoListHandler = () => {
        props.deleteTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addNewTask(title, props.id)
    }

    return (

        <div>
            <div><h3>{props.title}</h3>
                <button onClick={onRemoveTodoListHandler}>x</button>
            </div>
            <div>
                <InputClones addNewItem={addTask}/>
            </div>

            <ul>

                {
                    props.data.map(m => {

                        const onCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(m.id, e.currentTarget.checked, props.id)
                        }


                        const onChangeTitleHandler = (newValue:string) => {
                           props.changeTitleTask(m.id, newValue, props.id)
                        }


                        const onClickRemoveHandler = () => {
                            props.remove(m.id, props.id)
                        }
                        return <li key={m.id} className={m.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={m.isDone} onChange={onCheckBoxHandler}/>
                            <EditableSpan title={m.title} change={onChangeTitleHandler}/>
                            <button onClick={onClickRemoveHandler}>X</button>


                        </li>
                    })
                }


            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>

            </div>
        </div>
    )

}