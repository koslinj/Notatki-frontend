import React, { useState } from 'react'
import './NewNote.css'

function NewNote(props) {

  const [showForm, setShowForm] = useState(false); 
  const [title,setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const changeTitleHandler = (event) => {
    const value = event.target.value;
    setTitle(value);
  }
  const changeDescHandler = (event) => {
    const value = event.target.value;
    setDesc(value);
  }
  const addNote = () => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    const note = {
        title: title,
        body: desc,
        when: date
    }
    props.onAdd(note);

    setTitle('');
    setDesc('');
    setShowForm(false);
  }

  return (
    showForm ? (
    <div className='note'>
        <label>Tytuł:</label>
        <input type="text" value={title} onChange={changeTitleHandler}/>

        <label>Opis:</label>
        <input type="text" value={desc} onChange={changeDescHandler}/>

        <button onClick={() => addNote()}>Dodaj notatkę</button>
    </div>
  ) : (
    <button className='new-note-btn' onClick={() => setShowForm(true)}>Nowa notatka</button>
  )
  )
}

export default NewNote;