import React, {Component} from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import NoteList from './Components/NoteList/NoteList';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notes: [
                {
                    text: 'Given the code below, we use the map() function to take an array of numbers and double their values. We assign the new array returned by map() to the variable doubled and log it:',
                    date: new Date(),
                    id: 1
                },
                {
                    text: ' We assign ',
                    date: new Date(),
                    id: 2
                }],
            selectedNoteID: 1,
            searchTerm: ''
        };
    }

    noteClickHandler = (id) => {
        this.setState({
            selectedNoteID: id
        })
    };

    deleteClickHandler = () => {
        let notes = [...this.state.notes];

        notes = notes.filter((note) => {
            return note.id !== this.state.selectedNoteID;
        });

        let selectedNoteID = notes.length ? notes[0].id : null;

        this.setState({
            notes: notes,
            selectedNoteID: selectedNoteID
        })
    };

    searchInputHandler = (input) => {
        this.setState({
            searchTerm: input
        })
    };

    render() {
        return (
            <div>
                <NavBar deleteClickHandler={this.deleteClickHandler} searchInputHandler={this.searchInputHandler}/>
                <NoteList notes={this.state.notes} selected={this.state.selectedNoteID} searchTerm={this.state.searchTerm}
                          noteClickHandler={this.noteClickHandler}/>
            </div>
        );
    }

}

export default App;
