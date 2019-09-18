import React, {Component} from 'react';
import Classes from './Notepad.module.css';

class Notepad extends Component {

    constructor(props) {
        super(props);
        this.padRef = React.createRef();
    }

    padClicked = () => {
        if(document.activeElement !== this.padRef.current){ // a click anywhere in the notepad should give focus
            this.padRef.current.focus();
        }
    };

    render(){

        if(!this.props.note) return null;

        let date = this.props.note.date;

        let dateString = date.toDateString() + " at " + date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});

        return (
            <div className={Classes.notepad} onClick={this.padClicked}>
                <h3>{dateString}</h3>
                <textarea className={Classes.textarea} ref={this.padRef} value={this.props.note.text} onChange={this.props.noteChangeHandler}/>
            </div>
        )
    }
}

export default Notepad;
