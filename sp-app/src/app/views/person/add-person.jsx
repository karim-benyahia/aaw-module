import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const addPerson = ()=>{

    let query = useQuery();
    let navigate = useNavigate();
    let eventId = query.get("event") || "";

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [event, setEvent] = useState(eventId);
    const [events, setEvents] = useState([]);

    const loadEvents = () =>{
        fetch("/api/event")
            .then(res => res.json())
            .then(setEvents)
    }

    useEffect(() => {
        loadEvents();

    }, []);

    const submit = (e) => {
        e.preventDefault();
        fetch("/api/person",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({firstName, lastName, event:{id:event}})
        })
            .then(() => navigate("/person"))
    }

    return (
        <main>

            <h1>Ajouter un participant</h1>

            <form className="form-ajout"
                  onSubmit={submit}>
                <label htmlFor="firstName">Prénom</label>
                <input type="text" id="firstName" required
                       value={firstName}
                       onChange={(e)=>setFirstName(e.currentTarget.value)}/>
                <label htmlFor="lastName">Nom</label>
                <input type="text" id="lastName" required
                       value={lastName}
                       onChange={(e)=>setLastName(e.currentTarget.value)}/>
                <label htmlFor="eventId">Evénement</label>
                <select id="eventId" required
                        value={event}
                        onChange={(e)=>setEvent(e.currentTarget.value)}>
                    <option value=""></option>
                    {
                        events && events.map(event=><option key={event.id} value={event.id}>{event.name}</option>)
                    }
                </select>
                <div className="action">
                    <a className="annuler-ajout" href="/">Annuler</a>
                    <input className="valider-ajout" type="submit" value="Valider"/>
                </div>
            </form>

        </main>
    )
};

export default addPerson;

