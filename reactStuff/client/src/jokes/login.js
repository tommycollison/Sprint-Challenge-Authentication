import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    } 
    render() {
    return (
        <div className='loginDiv'>
            <p>You must be authenticated to view the jokes.</p>
            <div className='formDiv'>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor='username'><p>Username</p><input type='text' placeholder='Your dad name'></input></label>
                    
                    <label htmlFor='password'><p>Password</p><input type='text' placeholder='Your dad password'></input></label>
                </form>
            <button onClick={this.onClick}>Let's get some dad jokes</button>
            </div> 
        </div>
    )}

    handleSubmit() {
        // e.preventDefault();
        const endpoint = 'http://localhost:3300/api/jokes'
    }
}

export default Login