import React, {ChangeEvent, useState} from "react";

type InputClonesType = {

    addNewItem: (titleTodolist: string) => void

}
export const InputClones = (props: InputClonesType) => {
    let [titleTodolist, setTitleTodolist] = useState<string>('')
    let [error, setError] = useState<string | null>('')
    const addNewTask = () => {
        if (titleTodolist.trim() !== '') {
            props.addNewItem(titleTodolist.trim())
            setTitleTodolist('')
        } else setError('Error/ошибка')
    }
    const addNewTaskOnKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null);

        if (13 === e.charCode) {
            addNewTask();

        }
    }
    const addNewTaskOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleTodolist(e.currentTarget.value)
    }


    return (<div>
            <input value={titleTodolist}
                   onChange={addNewTaskOnChangeHandler}
                   onKeyPress={addNewTaskOnKeyPressHandler}
            />
            <button onClick={addNewTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}