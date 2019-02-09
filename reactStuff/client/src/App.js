import React, { Component } from 'react';
import './App.css';
import {Route, NavLink} from 'react-router-dom';
import jokes from './jokes/jokes';
import login from './jokes/login';

class App extends Component {
  render() {
    return (
      <div className='Container'>
      <div className='navLinks'>
        <NavLink exact to='/'>Home</NavLink>
        <NavLink exact to='/jokes'>Jokes</NavLink>
        <NavLink exact to='/login'>Log in</NavLink>
      </div>
      <h1>The Dad Joke Website</h1>
      <p>Like elks on the serenghetti, dads must, from time to time, return to the canonical source of all dad jokes to replenish their stock.</p>
      <Route path='/jokes' component={jokes} />
      <Route path='/login' component={login} />
      </div>
    );
  }
}

export default App;
