import React from 'react'
import { Link } from 'react-router-dom'
/*eslint-disable semi*/
import axios from 'axios';

export class App extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    render() {
        return(
            <div>               
                <ul>
                    <li><Link to="/">到登录</Link></li>
                    <li><Link to="/home">到主页</Link></li>
                </ul>
                {
                    this.props.children
                }
            </div>
        )
    }
}