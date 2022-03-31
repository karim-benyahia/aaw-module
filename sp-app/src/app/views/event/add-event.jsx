import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const addEvent = ()=>{
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [date, setDate] = useState("");

    const submit = (e) => {
        e.preventDefault();
        fetch("/api/event",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name, date})
        })
            .then(() => navigate("/event"))
    }

    return (
        <main>

            <h1>Ajouter un événement</h1>

            <form className="form-ajout"
                  onSubmit={submit}
                  >
                <label htmlFor="name">Nom</label>
                <input type="text" id="name"
                       onChange={(e)=>setName(e.currentTarget.value)}
                       required value={name}/>
                <label htmlFor="date">Date</label>
                <input type="date" id="date"
                       onChange={(e)=>setDate(e.currentTarget.value)}
                       required value={date}/>
                <div className="action">
                    <a className="annuler-ajout" href="/">Annuler</a>
                    <input className="valider-ajout" type="submit" value="Valider"/>
                </div>
            </form>

        </main>
    )
};

export default addEvent;

