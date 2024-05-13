import React, { Component } from "react"
import Config from "./config/config"


class RobotSwitch extends Component {
    state =
        {
            connected: false,
            ros: null

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

    mode_callback = (mode_name) =>
        {
            var mode_msg = new window.ROSLIB.Message
            (
                {
                    data: mode_name
                }
            )
            var mode_pub = new window.ROSLIB.Topic
            (
                {
                    ros: this.state.ros,
                    name:Config.MODE_TOPIC,
                    messageType: "std_msgs/String"
                }
            )
            mode_pub.publish(mode_msg)
        }

    


    render() {
        return (
            <div>
                <button type="button" class="btn btn-outline-primary"
                onClick={()=> this.mode_callback("AUTO")}>Auto mode</button>
                <button type="button" class="btn btn-outline-secondary"
                onClick={()=> this.mode_callback("MANUAL")}>Manual mode</button>
            </div>
        )
    }
}
export default RobotSwitch