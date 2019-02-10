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
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='username'><p>Username</p><input name='username' type='text' placeholder='Your dad name' onChange={this.inputHandler}></input></label>
                    
                    <label htmlFor='password'><p>Password</p><input name='password' type='text' placeholder='Your dad password' onChange={this.inputHandler}></input></label>
                </form>
            <button onClick={this.handleSubmit}>Let's get some dad jokes</button>
            </div> 
        </div>
    )}

    handleSubmit = (event) => {
        event.preventDefault();
        const endpoint = 'http://localhost:3300/api/login/';

        const login = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(endpoint, login)
        .then(res => {
            console.log(res.data)
            localStorage.setItem('jwt', res.data.token)

        })

        .catch(err => console.log(`error, line 38 of logn.js:`, err))
    }

    inputHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
        console.log(this.state)
    }
}

export default Login