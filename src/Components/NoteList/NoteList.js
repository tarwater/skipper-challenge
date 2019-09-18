import React, {Component} from 'react';
import Classes from './NoteList.module.css'

class NoteList extends Component {


    render() {

        let notes = this.props.notes.map((note) => {

            if(!this.props.filteredNotes.includes(note.id)){
                return null;
            }

            let lineOne = note.text;
            let date = note.date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
            let lineTwo = note.text.slice(40);  // Not precise--this number will change. Getting the overflow text in the two lines to match up
                                                // has no immediately obvious solution to me, but the right value would need to be calculated with JS after rendering,
                                                // plus any time the window width changes... Very doable though.

            let classes = '';

            if (note.id === this.props.selected) {
                classes += Classes.selected;
            }

            return (
                <li key={note.id} className={classes} onClick={() => this.props.noteClickHandler(note.id)}>
                    <p><strong>{lineOne}</strong></p>
                    <p><strong>{date}</strong> <span>{lineTwo}</span></p>
                </li>
            )
        }).filter((n) => n !== null);

        notes = notes.sort((n1, n2) => {
            return n2.key - n1.key;
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
