import React, {ChangeEvent, useState} from "react";

type TodolistProrsType = {
    title: string,
    remove: (x: string) => void,
    changeFilter: (value: 'all' | 'active' | 'completed') => void,
    data: Array<ArrayDataType>
    addNewTask: (titleTodolist: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter:string
}

type ArrayDataType = {
    id: string;
    tasks: string
    isDone: boolean
}


export const Todolist = (props: TodolistProrsType) => {
    let [titleTodolist, setTitleTodolist] = useState<string>('')
    let [error, setError] = useState<string | null>('')


    const addNewTaskHandler = () => {
        if (titleTodolist.trim() !== '') {
            props.addNewTask(titleTodolist.trim())
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
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }


    return (

        <div>
            <h3>{props.title}</h3>
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
                            props.changeStatus(m.id, e.currentTarget.checked)
                        }


                        const onClickRemoveHandler = () => {
                            props.remove(m.id)
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