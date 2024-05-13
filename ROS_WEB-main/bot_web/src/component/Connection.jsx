import React, {Component} from "react"
import Config from "./config/config"


class Connection  extends Component {
    
    state = 
    {
        connected:false,
        ros:null

    }

    constructor()
    {
        super()
        this.init_connection()
    }

    init_connection()
    {
        this.state.ros = new window.ROSLIB.Ros()
        console.log(this.state.ros)

        this.state.ros.on(
            "connection",
            () =>
                {
                    console.log("Connection is established")
                    this.setState({connected: true})
                }
        )

        this.state.ros.on(
            "error",
            (error) =>
                {
                    console.log("Connection has problem")
                }
        )
        this.state.ros.on(
            "close",
            () =>
                {
                    console.log("Connection closed !")
                    this.setState({connected: false})

                    setTimeout(()=> {

                    try{
                        this.state.ros.connect(
                            "ws://"+
                            Config.ROSBRIDGE_IP+
                            ":9090"
                        )
                    }
                    catch (error)
                    {
                        console.log("Connection problem")
                    }
                }, 1000)
                }
        )
        try{
            this.state.ros.connect(
                "ws://"+
                Config.ROSBRIDGE_IP+
                ":9090"
            )
        }
        catch (error)
        {
            console.log("Connection problem")
        }
    }

    render(){
        const statusStyle =
        {
            color: this.state.connected? 'green': 'red'
        }

        return(
            <div>
                <h2 style={statusStyle}> 
                    {this.state.connected? 'Connected':'Disconnected'}
                </h2>
            </div>
        )

            
    }
}
export default Connection;