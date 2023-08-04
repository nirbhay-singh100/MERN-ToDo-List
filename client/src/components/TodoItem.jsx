import React from "react";

const TodoItem = (props) => {

    return (
        <div
            onClick = {()=>{
                props.onChecked(props.id);
            }}
        >
        <li>{props.text}</li>
            
        </div>
    )
}

export default TodoItem;