import React from "react";
import './Notes.css';
import Note from "./Note/Note";
import NewNote from "./NewNote/NewNote";
import Modal from 'react-modal';
import EditNote from "./EditNote/EditNote";
import axios from '../../axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Notes extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            notes: [],
            showEditModal: false,
            editNote: {}
        }
    }

    componentDidMount(){
        this.fetchNotes();
    }

    async fetchNotes() {
        const res = await axios.get('/notes');
        const notes = res.data;
        this.setState({notes: notes})
    }

    async deleteNote(id) {
        console.log('usuwanie notatki', id);
        const notes = [...this.state.notes].filter(note => note._id !== id);
        await axios.delete('/notes/'+id);
        this.setState({notes: notes});
    }

    async addNote(note) {
        const notes = [...this.state.notes];

        try{
            const res = await axios.post('/notes', note);
            const newNote = res.data;
            console.log(note);

            notes.push(newNote);
            this.setState({notes: notes})
        } catch(err){
            NotificationManager.error(err.response.data.message)
        }
        
    }

    async editNote(note) {
        // edit backend
        await axios.put('/notes/'+note._id, note)
        // edit frontend
        const notes = [...this.state.notes];
        const index = notes.findIndex(x => x._id === note._id);
        if (index >= 0){
            notes[index] = note;
            this.setState({notes: notes})
        }
        this.toggleModal();
    }

    toggleModal() {
        this.setState({showEditModal: !this.state.showEditModal});
    }

    editNoteHandler(note) {
        this.toggleModal();
        this.setState({editNote: note});
    }


    render(){
        
        return (
            <div>
                <NotificationContainer/>
                <h1>Notatki:</h1>

                <NewNote
                    onAdd={(note) => this.addNote(note)} />

                <Modal
                    isOpen={this.state.showEditModal}
                    appElement={document.getElementById('root')}
                    contentLabel="Edytuj notatkę" >
                        <EditNote
                        title={this.state.editNote.title}
                        body={this.state.editNote.body}
                        id={this.state.editNote._id}
                        onEdit={(note) => this.editNote(note)} />
                        <button onClick={() => this.toggleModal()}>Anuluj</button>
                </Modal>
                <div className="notes-container">
                    {this.state.notes.map(note => (
                    <Note
                        key={note._id}
                        title={note.title}
                        body={note.body}
                        id={note._id}
                        when={note.when}
                        onEdit={(note) => this.editNoteHandler(note)}
                        onDelete={(id) => this.deleteNote(id)} />
                    ))}
                </div>
                

            </div>
        )
    }
}

export default Notes;