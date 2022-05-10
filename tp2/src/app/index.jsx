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
        }
    }

    // Méthode d'initialisation de notre composant
    // cette méthode est appelé par React suite au premier rendu
    componentDidMount() {
        // Appel vers notre serveur
        fetch('/api/events')
            .then((res) => res.json())
            .then((eventsReponse) => {
                // on met à jour l'état de notre composant
                // ce qui forcera son rendu, donc l'appel à la méthode render
                this.setState({events: eventsReponse})
            })
    }

    render() {
        const {events} = this.state; // équivalent à const events = this.state.events;
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
            </div>
        )
    }
}

ReactDOM.render(<Comp/>
    , document.getElementById("root"))
