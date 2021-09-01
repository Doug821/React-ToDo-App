import React, { useState } from 'react';
import api from '../api';
import { useHistory } from 'react-router-dom';
import { GoMarkGithub } from 'react-icons/go';

import Logo from '../Assets/LogoWhite.svg';

export default function Login() {
    const history = useHistory();
    const [userValue, setUserValue] = useState('');

    function signIn(e) {
        e.preventDefault();

        api.get(`/${userValue}`)
            .then((response) => {
                localStorage.setItem('user', JSON.stringify({ login: response.data.login, name: response.data.name, avatar_url: response.data.avatar_url }));
                history.push('/');
            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="logInWrapper">
            <img className="logo" src={Logo} alt="I Do" />
            <div className="logInCard">
                <h1>Tell us your Github<span><GoMarkGithub /></span></h1>
                <form action="">
                    <input type="text" onChange={e => setUserValue(e.target.value)} placeholder="Github Username" />
                    <button onClick={signIn}>Sign In</button>
                </form>
            </div>
        </div>
    )
}
