import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Login from './Components/LogIn';
import UserTodo from './Components/CheckLogin';
import Todo from './Components/ToDo';

export default class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/signin" component={Login} />
                    <UserTodo path="/" component={Todo} />
                </Switch>
            </BrowserRouter>
        )
    }
}