import React, {Component} from 'react';
import Classes from './Notepad.module.css';

class Notepad extends Component {

    render(){
        return (
            <div className={Classes.notepad}>
                <h3>Title</h3>
            </div>
        )
    }
}

export default Notepad;
