import {todolistsType} from "../App";
import {v1} from "uuid";



type ActionsType = RemoveTodolistACType |
    AddTodolistACType |
    ChangeTodolistTitleACType |
    ChangeTodolistFilterACType


export type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistACType = ReturnType<typeof AddTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof ChangeTodolistFilterAC>


export const todolistsReducer = (state: Array<todolistsType>, action: ActionsType): Array<todolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [
                ...state,
                {
                    id: action.todolistId,
                    title: action.title,
                    filter: 'all'
                }
            ]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(f => f.id === action.id)
            if (todolist)
                todolist.title = action.title
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(f => f.id === action.id)
            if (todolist)
                todolist.filter = action.filter;
            return [...state]
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: id
    } as const
}
export const AddTodolistAC = ( title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todolistId : v1()
    } as const
}
export const ChangeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    } as const
}
export const ChangeTodolistFilterAC = (id: string, filter: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    } as const
}


/*export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    id: string,
    title:string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: string
}*/
