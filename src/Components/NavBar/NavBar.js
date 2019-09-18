import React, {Component} from 'react';
import Classes from './NavBar.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt, faSearch, faEdit} from '@fortawesome/free-solid-svg-icons'

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.searchRef = React.createRef();
        this.state = {
            displayIcon: this.props.searchTerm === ''
        }
    }

    keyPress = (e) => {
        if(this.props.searchTerm === '') return;

        if(e.key === 'Enter'){
            this.props.newNoteHandler(e, e.target.value);
        }
    };

    render() {

        let displaySearchIcon = this.props.searchTerm === '' ? // getting the magnifying glass icon in the search bar was kind of a pain...
            <FontAwesomeIcon className={Classes.searchIcon} icon={faSearch}/> : <div></div>;

        return (
            <div className={Classes.navbar}>
                <button className={Classes.button} onClick={this.props.newNoteHandler}><FontAwesomeIcon className={Classes.icon} icon={faEdit}/>
                </button>
                <button className={Classes.button} onClick={this.props.deleteClickHandler}><FontAwesomeIcon className={Classes.icon} icon={faTrashAlt}/>
                </button>
                {displaySearchIcon}
                <input type="text" className={Classes.search} placeholder="Search" ref={this.searchRef}
                       onChange={this.props.searchInputHandler} value={this.props.searchTerm} onKeyPress={this.keyPress}/>
            </div>
        )
    }
}

export default NavBar;
