import React, {ChangeEvent, useState} from "react";

type TodolistProrsType = {
    title: string,
    remove: (x: string,todoID:string) => void,
    changeFilter: (value: 'all' | 'active' | 'completed',id:string) => void,
    data: Array<ArrayDataType>
    addNewTask: (titleTodolist: string,todoID:string) => void
    changeStatus: (id: string, isDone: boolean,todoID:string) => void
    filter:string
    id:string
    deleteTodolist:(todoID:string)=>void
}

export type ArrayDataType = {
    id: string;
    tasks: string
    isDone: boolean
}


export const Todolist = (props: TodolistProrsType) => {
    let [titleTodolist, setTitleTodolist] = useState<string>('')
    let [error, setError] = useState<string | null>('')


    const addNewTaskHandler = () => {
        if (titleTodolist.trim() !== '') {
            props.addNewTask(titleTodolist.trim(),props.id)
            setTitleTodolist('')
        } else setError('Error/ошибка')
    }


    const addNewTaskOnKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null);

        if (e.charCode === 13) {
            addNewTaskHandler();

        }
    }
    const addNewTaskOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleTodolist(e.currentTarget.value)
    }
    const onAllClickHandler = () => {
        props.changeFilter('all',props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active',props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed',props.id)
    }

    const onRemoveTodoListHandler = ()=> {
        props.deleteTodolist(props.id)
    }

    return (

        <div>
            <div><h3>{props.title}</h3>            <button onClick={onRemoveTodoListHandler}>x</button></div>
            <div>
                <input value={titleTodolist}
                       onChange={addNewTaskOnChangeHandler}
                       onKeyPress={addNewTaskOnKeyPressHandler}
                />
                <button onClick={addNewTaskHandler}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.data.map(m => {

                        const onCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(m.id, e.currentTarget.checked,props.id)
                        }


                        const onClickRemoveHandler = () => {
                            props.remove(m.id,props.id)
                        }
                        return <li key={m.id} className={m.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={m.isDone} onChange={onCheckBoxHandler}/>
                            <span>{m.tasks}</span>
                            <button onClick={onClickRemoveHandler}>X</button>


                        </li>
                    })
                }


            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All</button>
                    <button
                        className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active</button>
                    <button
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed</button>

                    </div>
                    </div>
                    )

                    }