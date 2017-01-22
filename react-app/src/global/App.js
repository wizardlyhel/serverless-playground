import React, { Component } from 'react';
import './App.scss';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {
    render() {
        return (
            <div>
                <h2>Login</h2>
                <TextField type="email" floatingLabelText="Email"/>
                <TextField type="password" floatingLabelText="Password"/>
                <RaisedButton primary={true} label="Login" />
            </div>
        );
    }
}

export default App;
