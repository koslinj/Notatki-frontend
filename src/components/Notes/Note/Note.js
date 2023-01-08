import React from "react";

function Note(props) {

    const arr = props.when.split("/");

    const table = {
        1: "styczeń",
        2: "luty"
    }

    const editHandler = () => {
        props.onEdit({
            title: props.title,
            body: props.body,
            _id: props.id
        })
    }

    return (
        <div className="note">
            <p>{arr[0]} {table[arr[1]]} {arr[2]}</p>
            <p className="title">{props.title}</p>
            <div className="description">{props.body}</div>
            <button onClick={editHandler}>edytuj</button>
            <button
            className="delete"
            onClick={() => props.onDelete(props.id)}>usuń</button>    
        </div>
    );
}

export default Note;