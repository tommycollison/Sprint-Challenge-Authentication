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
                <p>Hello from the jokes div!</p>
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
            this.setState({users: res.data})
        })
    }

}

export default Jokes;