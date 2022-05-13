import React, {useState} from "react";

const AddEvent = ({loadEvents})=>{

    const [name, setName] = useState("");

    const valider=(e)=>{
            // necessaire pour éviter le comportement par defaut de soumission de formulaire
            e.preventDefault();

            // On crée notre event
            let event = {name:name};
            // On le transforme en chaine de caractère afin d'etre transmissible dans la requête
            // "{\"name\":\"Nuit Sombre"\}"
            let body = JSON.stringify(event);

            // On appel ensuite notre serveur
            fetch('api/events', {
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })
                .then((res) => res.json())
                .then((eventsReponse) => {
                    // Il faudra ici rappeler le service de lecture d'événement
                })

    }

    return (
        <form onSubmit={valider}>
            <input type={"text"} value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
            <button>Valider</button>
        </form>
    )
}

export default AddEvent;
