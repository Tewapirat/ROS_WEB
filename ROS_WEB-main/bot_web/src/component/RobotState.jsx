import React, { Component } from "react"
import Config from "./config/config"


class RobotState extends Component {
    state =
        {
            connected: false,
            ros: null,
            info_msg: ""

        }

    constructor() {
        super()
        this.init_connection()
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros()
        console.log(this.state.ros)

        this.state.ros.on(
            "connection",
            () => {
                console.log("Connection is established")
                this.setState({ connected: true })
            }
        )

        this.state.ros.on(
            "error",
            (error) => {
                console.log("Connection has problem")
            }
        )
        this.state.ros.on(
            "close",
            () => {
                console.log("Connection closed !")
                this.setState({ connected: false })

                setTimeout(() => {

                    try {
                        this.state.ros.connect(
                            "ws://" +
                            Config.ROSBRIDGE_IP +
                            ":9090"
                        )
                    }
                    catch (error) {
                        console.log("Connection problem")
                    }
                }, 1000)
            }
        )
        try {
            this.state.ros.connect(
                "ws://" +
                Config.ROSBRIDGE_IP +
                ":9090"
            )
        }
        catch (error) {
            console.log("Connection problem")
        }
    }

    getRobotInfo(){
        var info_sub = new window.ROSLIB.Topic
        (
            {
                ros:this.state.ros,
                name:Config.INFO_TOPIC,
                messageType: "std_msgs/String",
            }
        )
        info_sub.subscribe
        (
            (message) => 
                {
                    this.setState({info_msg: message.data})
                }
        )
    }

    componentDidMount()
    {
        this.getRobotInfo()
    }

    render() {
        return (
            <div>
                <p>{this.state.info_msg}</p>
            </div>
        )
    }
}
export default RobotState