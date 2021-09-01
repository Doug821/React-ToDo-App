import React from "react";
import { Redirect, Route } from "react-router-dom";

function UserTodo({ component: Component, ...rest }) {
    const user = JSON.parse(localStorage.getItem('user')) ? true : false;

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/signin" }} />
                )
            }
        />
    );
}

export default UserTodo;
