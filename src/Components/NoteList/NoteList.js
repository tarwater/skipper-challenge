import React, {Component} from 'react';
import Classes from './NoteList.module.css'

class NoteList extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        let notes = this.props.notes.map((note) => {

            if(this.props.searchTerm && note.text.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) === -1){
                return null;
            }

            let lineOne = note.text.slice(0, 48);
            let date = note.date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
            let lineTwo = note.text.slice(48);

            let classes = '';

            if(note.id === this.props.selected){
                classes += Classes.selected;
            }

            return (
                <li key={note.id} className={classes} onClick={() => this.props.noteClickHandler(note.id)}>
                    <p><strong>{lineOne}</strong></p>
                    <p><strong>{date}</strong> <span>{lineTwo}</span></p>
                </li>
            )
        });

        return (
            <div className={Classes.notelist}>
                <ul className={Classes.list}>
                    {notes}
                </ul>
            </div>
        )
    }
}

export default NoteList;
