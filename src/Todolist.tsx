import React, {ChangeEvent, useState} from "react";
import {InputClones} from "./InputClones";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodolistPropsType = {
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
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export type ArrayDataType = {
    id: string;
    title: string
    isDone: boolean
}


export const Todolist = (props: TodolistPropsType) => {
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
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    const addTask = (title: string) => {
        props.addNewTask(title, props.id)
    }

    return (

        <div>
            <div>
                <h3><EditableSpan title={props.title} change={changeTodolistTitle}/>
                    <IconButton onClick={onRemoveTodoListHandler}>
                        <Delete/>
                    </IconButton>
                </h3>
            </div>
            <div>
                <InputClones addNewItem={addTask}/>
            </div>
            <div>
                {
                    props.data.map(m => {
                        const onCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(m.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTitleTask(m.id, newValue, props.id)
                        }
                        const onClickRemoveHandler = () => {
                            props.remove(m.id, props.id)
                        }
                        return <div key={m.id} className={m.isDone ? 'is-done' : ''}>
                            <Checkbox checked={m.isDone} onChange={onCheckBoxHandler}/>
                            <EditableSpan title={m.title} change={onChangeTitleHandler}/>
                            <IconButton onClick={onClickRemoveHandler}>
                                <Delete/>
                            </IconButton>


                        </div>
                    })
                }


            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={"primary"}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={"secondary"}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )

}