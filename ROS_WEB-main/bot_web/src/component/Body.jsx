import React, {Component} from 'react'
import {Route, BrowserRouter as Router, Routes as Switch} from 'react-router-dom'
import Home from './Home'
import About from './About'

class Body extends Component{

    render()
    {
        return(
            <Router>
                <Switch>
                    <Route path="/" element ={<Home></Home>}></Route>
                    <Route path="/about" element ={<About></About>}></Route>
                </Switch>
            </Router>

        )
    }
}

export default Body