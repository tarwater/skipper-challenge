import React, {Component} from 'react';
import Classes from './NavBar.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt, faSearch} from '@fortawesome/free-solid-svg-icons'

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.searchRef = React.createRef();
        this.state = {
            displayIcon: true
        }
    }

    onInput = () => {

        let input = this.searchRef.current.value;

        this.setState({
            displayIcon: input.length === 0
        });

        this.props.searchInputHandler(input);
    };

    render() {

        let displaySearchIcon = this.state.displayIcon ?
            <FontAwesomeIcon className={Classes.searchIcon} icon={faSearch}/> : <div></div>;

        return (
            <div className={Classes.navbar}>
                <button className={Classes.button} onClick={this.props.deleteClickHandler}><FontAwesomeIcon className={Classes.icon} icon={faTrashAlt}/>
                </button>
                {displaySearchIcon}
                <input type="text" className={Classes.search} placeholder="Search" ref={this.searchRef}
                       onInput={this.onInput}/>
            </div>
        )
    }
}

export default NavBar;
