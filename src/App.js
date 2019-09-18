import React, {Component} from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import NoteList from './Components/NoteList/NoteList';
import Notepad from "./Components/Notepad/Notepad";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notes: [ // array of the note objects
                {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam facilisis vulputate nisi, in tempus lectus dignissim at. Fusce eleifend felis quis mollis ultrices.',
                    date: new Date('2019-09-18T08:30:00Z'),
                    id: 1
                }],
            selectedNoteID: 1, // active note
            searchTerm: '',
            totalNotes: 1, // used for incrementing ID,
            filteredNotes: [1] // which notes to display in sidebar
        };
    }

    noteClickHandler = (id) => {
        this.setState({
            selectedNoteID: id
        })
    };

    deleteClickHandler = () => {

        if(!this.state.filteredNotes.includes(this.state.selectedNoteID)){ // can't delete a note not in the list
            return;
        }

        let notes = [...this.state.notes];

        notes = notes.filter((note) => {
            return note.id !== this.state.selectedNoteID;
        });

        let selectedNoteID = notes.length ? notes[notes.length - 1].id : null; // active note is set to the latest one

        this.setState({
            notes: notes,
            selectedNoteID: selectedNoteID
        })
    };

    searchInputHandler = (e) => {
        let notes = [...this.state.notes];

        let filteredNotes = notes.filter(n => {
           return n.text.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
        }).map(n => n.id);

        let selectedNoteID = this.state.selectedNoteID;

        if(!filteredNotes.includes(this.state.selectedNoteID)){ // as the list is filtered, we want to keep focus on notes actually in the filtered list
            selectedNoteID = filteredNotes.length ? filteredNotes[filteredNotes.length - 1] : null;
        }

        this.setState({
            searchTerm: e.target.value,
            filteredNotes: filteredNotes,
            selectedNoteID: selectedNoteID
        })
    };

    newNoteHandler = (e, text = '') => {

        if(text !== '' && this.state.filteredNotes.length !== 0){ // coming from an 'enter' press, so don't create unless the list is empty
            return;
        }

        let notes = [...this.state.notes];

        let newNote = {
            text: text,
            date: new Date(),
            id: this.state.totalNotes + 1
        };

        notes.push(newNote);

        this.setState((prev) => {
            return {
                notes: notes,
                totalNotes: ++prev.totalNotes,
                selectedNoteID: newNote.id,
                searchTerm: '',
                filteredNotes: notes.map(n => n.id)
            }
        });
    };

    noteChangeHandler = (e) => {
        let notes = [...this.state.notes];
        let note = notes.find((n) => n.id === this.state.selectedNoteID);

        note.text = e.target.value;

        this.setState({
            notes: notes,
        });
    };

    render() {

        let activeNote = this.state.notes.find((n) => n.id === this.state.selectedNoteID);

        return (
            <div>
                <NavBar deleteClickHandler={this.deleteClickHandler} searchInputHandler={this.searchInputHandler}
                        newNoteHandler={this.newNoteHandler} searchTerm={this.state.searchTerm}/>
                <NoteList notes={this.state.notes} selected={this.state.selectedNoteID}
                          searchTerm={this.state.searchTerm}
                          noteClickHandler={this.noteClickHandler} filteredNotes={this.state.filteredNotes}/>
                <Notepad note={activeNote} noteChangeHandler={this.noteChangeHandler}/>
            </div>
        );
    }

}

export default App;
