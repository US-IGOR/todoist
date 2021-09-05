import {todolistsType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

export type RemoveTodolistActionType = {
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
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: string
}

type ActionsType = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType


// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<todolistsType>, action: ActionsType): Array<todolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id != action.id)
        }

        case 'ADD-TODOLIST': {
            return [
                ...state,
                {
                    id: v1(),
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
