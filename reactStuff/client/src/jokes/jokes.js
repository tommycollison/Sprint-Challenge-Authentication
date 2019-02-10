import React, {Component} from 'react';
import axios from 'axios'

class Jokes extends Component {

    render() {
        return(
            <div className="jokesDiv">
                <p>Hello from the jokes div!</p>
            </div>
        )
    }

    componentDidMount(){
        const endpoint = 'http://localhost:3300/api/jokes';
        axios.get(endpoint).then(res => {
            console.log(res.data)
        }).catch(err => {console.log('ERROR: line 18 of jokes.js:', err)})
    }
}

export default Jokes;