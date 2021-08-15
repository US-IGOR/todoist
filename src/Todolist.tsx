import React, {ChangeEvent, useState} from "react";

type TodolistProrsType = {
    title: string,
    remove: (x: string) => void,
    changeFilter: (value: 'all' | 'active' | 'completed') => void,
    data: Array<ArrayDataType>
    addNewTask: (titleTodolist: string) => void
}

type ArrayDataType = {
    id: string;
    tasks: string
    isDone: boolean
}


export const Todolist = (props: TodolistProrsType) => {
    let [titleTodolist, setTitleTodolist] = useState<string>('')
    const addNewTaskHandler = () => {
        props.addNewTask(titleTodolist)
        setTitleTodolist('')
    }
    const addNewTaskOnKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addNewTaskHandler();
        }
    }
    const addNewTaskOnChangeHandlerx = (e: ChangeEvent<HTMLInputElement>) => {
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
                       onChange={addNewTaskOnChangeHandlerx}
                       onKeyPress={addNewTaskOnKeyPressHandler}
                />
                <button onClick={addNewTaskHandler}>+</button>
            </div>
            <ul>
                {
                    props.data.map(m => {
                        const onClickRemoveHandler = () => {props.remove(m.id)}
                        return <li key={m.id}>
                            <input type="checkbox" checked={m.isDone}/>
                            <span>{m.tasks}</span>
                            <button onClick={onClickRemoveHandler}>X</button>

                        </li>
                    })
                }


            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )

}