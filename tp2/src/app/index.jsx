import React from "react";
import ReactDOM from "react-dom";

let Comp = ()=>{
    return <div>Salut React</div>;
}

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            events:[],
            loading:false
        }
    }

    componentDidMount() {
        this.setState({loading:true});
        fetch('/api/events')
            .then((res)=>res.json())
            .then((eventsReponse)=>{
                this.setState({loading:false, events:eventsReponse})
                console.log("retour appel http")
            })
            console.log("fin method")
    }

    render(){
        const {loading, events} = this.state;
        console.log("render", loading, events);
        return(
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        events && events
                            .map((event)=>{
                                return <tr>
                                    <td>{event.id}</td>
                                    <td>{event.name}</td>
                                </tr>
                            })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

ReactDOM.render(<Application/>
, document.getElementById("root"))
