import React from "react";

type TodolistProrsType ={
    title: string,
    remove: (x:number)=>void,
    changeFilter:(value:'all' | 'active' | 'completed')=>void,
    data: Array <ArrayDataType>
}

type ArrayDataType = {
    id: number;
    tasks:string
    isDone: boolean
}



export const Todolist = (props:TodolistProrsType) => {
    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
props.data.map(m=> <li key={m.id}><button onClick={()=>props.remove(m.id)}>X</button><input type="checkbox" checked={m.isDone}/> <span>{m.tasks}</span></li>  )
                }


            </ul>
            <div>
                <button onClick={()=>props.changeFilter('all')}>All</button>
                <button onClick={()=>props.changeFilter('active')}>Active</button>
                <button onClick={()=>props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )

}