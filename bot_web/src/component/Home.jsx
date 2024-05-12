import React, {Component} from "react"


class Home extends Component {
    
    state =
    {
        number_count : 0
    }

    count_callback = () =>
        {
            this.setState({number_count : this.state.number_count+1} )  
        }
    
    danger_callback = (A) =>
        {
            console.log(A)
        }
    
    button_callback = () => 
        {
            console.log("Botton")
        }

    render(){
        return(
            <div>
            <button type="button" class="btn btn-primary" onClick={()=> this.button_callback()} >Button</button>
            <button type="button" class="btn btn-danger" onClick={()=> this.danger_callback("OK")}>Danger</button>
            <button type="button" class="btn btn-info"onClick={()=> this.count_callback()}>Count</button>

            <h1>{this.state.number_count}</h1>
            </div>
        )
    }
}
export default Home