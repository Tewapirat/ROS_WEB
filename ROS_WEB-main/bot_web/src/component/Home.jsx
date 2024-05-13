import React, {Component} from "react"
import Connection from "./Connection"
import RobotSwitch from "./RobotSwitch"
import RobotState from "./RobotState"

class Home extends Component {
    
    
    render(){
        return(
           <div>
            <Connection></Connection>
            <RobotSwitch></RobotSwitch>
            <RobotState></RobotState>
           </div>
        )
    }
}
export default Home