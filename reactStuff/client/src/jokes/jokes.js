import React, {Component} from 'react';
import axios from 'axios'

class Jokes extends Component {
    constructor(props){
        super(props);
        this.state = {
            jokes: [],
        }
    }
    render() {
        return(
            <div className="jokesDiv">
            <h3>Some dad jokes</h3>
            <ul>
                {this.state.jokes.map(x =>
                    <li key={x.id}>{x.joke}</li>)}
            </ul>
            </div>
        )
    }
    componentDidMount(){
        const token = localStorage.getItem('jwt');
        const endpoint = 'http://localhost:3300/api/jokes';
        const options = {
         headers: {
             Authorization: token
         }
     }

        axios.get(endpoint, options)
        .then(res=>{
            console.log(res.data);
            this.setState({jokes: res.data})
        })
    }

}

export default Jokes;