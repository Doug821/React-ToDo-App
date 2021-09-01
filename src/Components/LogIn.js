import React from 'react';
import api from '../api';
// import { FiUser, FiGithub } from 'react-icons/fi';
import { GoMarkGithub } from 'react-icons/go';

import Logo from '../Assets/LogoWhite.svg';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = { userValue: '' };
        this.handleChange = this.handleChange.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    handleChange(event) {
        let username = event.target.value;
        this.setState({ userValue: username });
    }


    signIn(e) {
        e.preventDefault();

        api.get(`/${this.state.userValue}`)
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data));
                this.props.history.push('/');
            }).catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="logInWrapper">
                <img className="logo" src={Logo} alt="I Do" />
                <div className="logInCard">
                    <h1>Tell us your Github<span><GoMarkGithub /></span></h1>
                    <form action="">
                        <input type="text" onChange={this.handleChange} placeholder="Github Username" />
                        {/* <FiUser className="icon"/> */}
                        <button onClick={this.signIn}>Sign In</button>
                    </form>
                </div>
            </div>
        )
    }
}

