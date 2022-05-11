import React from "react";
import ReactDOM from "react-dom";

let Comp = () => {
    return <div>Salut React</div>;
}

class Application extends React.Component {
    constructor(props) {
        super(props);
        // initialisation de l'état du composant
        // ici un tableau d'événements vide
        this.state = {
            events: [],
            name:""
        }
    }

    // Méthode d'initialisation de notre composant
    // cette méthode est appelé par React suite au premier rendu
    componentDidMount() {
        // Appel vers notre serveur
        this.loadEvent();
    }

    loadEvent() {
        fetch('/api/events')
            .then((res) => res.json())
            .then((eventsReponse) => {
                // on met à jour l'état de notre composant
                // ce qui forcera son rendu, donc l'appel à la méthode render
                this.setState({events: eventsReponse})
            })
    }


    addEvent = (e)=>{
        e.preventDefault();
        fetch('/api/events', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.event)
        })
            .then((res) => res.json())
            .then((eventsReponse) => {
                // on met à jour l'état de notre composant
                // ce qui forcera son rendu, donc l'appel à la méthode render
                this.setState({events: eventsReponse})
            })

    }

    render() {
        const {events, event} = this.state; // équivalent à const events = this.state.events;
        return (
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
                        // on boucle sur notre liste d'événements, afin de les afficher
                        // ici on transforme chaque event en un <tr>
                        events && events
                            .map((event) => {
                                return <tr>
                                    <td>{event.id}</td>
                                    <td>{event.name}</td>
                                </tr>
                            })
                    }
                    </tbody>
                </table>

                <form onSubmit={this.addEvent}>
                    <input type={"text"} value={event.name}
                           onChange={(e)=>this.setState({name:e.currentTarget.value})}></input>
                    <button>Valider</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<Application/>
    , document.getElementById("root"))
