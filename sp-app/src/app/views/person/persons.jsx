import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

const persons = () => {

    const [persons, setPersons] = useState([]);
    const [events, setEvents] = useState([]);

    const loadPersons = () => {
        fetch("/api/person")
            .then(res => res.json())
            .then(setPersons)
    }

    const loadEvents = () =>{
        fetch("/api/event")
            .then(res => res.json())
            .then(setEvents)
    }

    useEffect(() => {
        loadEvents();
        loadPersons();

    }, []);

    const deletePerson = (person)=>{
        fetch(`/api/person/${person.id}`, {method: "DELETE"})
            .then(loadPersons)
    }


    return (
        <main>

            {

                events && events.map(event => {

                    return (
                        <div key={event.id}>

                            <div className="event-name"><span>{event.name}</span></div>

                            <table className="styled-table" style={{width: "-webkit-fill-available", margin: "0 50px"}}>
                                <thead>

                                <tr>
                                    <th style={{width: "100px"}}>id</th>
                                    <th>Prénom</th>
                                    <th>Nom</th>
                                    <th style={{width: "50px", padding: "0", textAlign: "center"}}>
                                        <Link title="Ajouter un événement" className="add-person"
                                              to={`/person/add?event=${event.id}`}>+</Link>
                                    </th>
                                </tr>
                                </thead>
                            </table>
                            <div className="list-person">
                                <table className="styled-table" style={{flex: "1", margin: "0"}}>
                                    <tbody>
                                    {
                                        persons && persons.filter(p=>Number(p.event.id) === event.id).map(person => {
                                            return (
                                                <tr key={person.id}>
                                                    <td style={{width: "100px"}}>{person.id}</td>
                                                    <td>{person.firstName}</td>
                                                    <td>{person.lastName}</td>
                                                    <td style={{width: "50px", padding: 0, textAlign: "center"}}>
                                                        <div
                                                              style={{
                                                                  display: "flex",
                                                                  justifyContent: "center",
                                                                  alignItems: "center"
                                                              }}>
                                                            <button title={'Supprimer ' + person.firstName}
                                                                    type="submit"
                                                                    onClick={()=>deletePerson(person)}
                                                                    className="del-person">
                                                                <span>x</span></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })
            }

        </main>
    )
};

export default persons;

