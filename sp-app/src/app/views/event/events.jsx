import React, {useEffect, useState} from "react";

const events = ()=>{

    const [events, setEvents] = useState([]);

    function loadEvents() {
        fetch("/api/event")
            .then(res => res.json())
            .then(setEvents);
    }

    useEffect(()=>{
        loadEvents();
    }, [])


    const deleteEvent = (event)=>{
        fetch(`/api/event/${event.id}`, {method: "DELETE"})
            .then(loadEvents)
    }
    return (
        <main>

            <h1>Evénements</h1>

            <table className="styled-table" style={{width: "-webkit-fill-available",margin:"0 50px"}}>
                <thead>

                <tr>
                    <th style={{width:"100px"}}>id</th>
                    <th>Nom</th>
                    <th>date</th>
                    <th style={{width:"50px", padding:"0",textAlign: "center"}}>
                        <a title="Ajouter un événement" className="add-person" href="event/add">+</a>
                    </th>
                </tr>
                </thead>
            </table>
            <div className="list-person">
                <table className="styled-table" style={{flex: "1",margin:"0"}}>
                    <tbody>
                    {
                        events && events.map(event => {
                            return (
                                <tr key={event.id}>
                                    <td style={{width: "100px"}} >{event.id}</td>
                                    <td >{event.name}</td>
                                    <td>{event.date}</td>
                                    <td style={{width:"50px",padding:0,textAlign: "center"}}>
                                        <div
                                              style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <button title={'Supprimer ' + event.name} type="submit"
                                                    className="del-person" onClick={()=>deleteEvent(event)}>
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

        </main>
    )
};

export default events;

