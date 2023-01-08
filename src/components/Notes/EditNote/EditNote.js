import React, {useState} from 'react'

export default function EditNote(props) {

  const [title,setTitle] = useState(props.title);
  const [desc, setDesc] = useState(props.body);

  const changeTitleHandler = (event) => {
    const value = event.target.value;
    setTitle(value);
  }
  const changeDescHandler = (event) => {
    const value = event.target.value;
    setDesc(value);
  }
  const editNote = () => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const note = {
        title: title,
        body: desc,
        when: date,
        _id: props.id
    }
    props.onEdit(note);
  }

  return (
    <div className='note'>
        <label>Tytuł:</label>
        <input type="text" value={title} onChange={changeTitleHandler}/>

        <label>Opis:</label>
        <input type="text" value={desc} onChange={changeDescHandler}/>

        <button onClick={() => editNote()}>Zapisz</button>
    </div>
  )
}
