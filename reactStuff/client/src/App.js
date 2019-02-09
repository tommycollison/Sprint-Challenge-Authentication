import React, { Component } from 'react';
import './App.css';
import {Route, NavLink} from 'react-router-dom';
import jokes from './jokes/jokes';

class App extends Component {
  render() {
    return (
      <div className='Container'>
      <div className='navLinks'>
        <NavLink exact to='/'>Home</NavLink>
        <NavLink exact to='/jokes'>Jokes</NavLink>
      </div>
      <h1>The Dad Joke Website</h1>
      <p>You must be authenticated to view the jokes.</p>
      <Route path='/jokes' component={jokes} />
      </div>
    );
  }
}

export default App;
