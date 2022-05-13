import React from "react";
import Aside from "../../component/aside";
import Header from "../../component/header";
import Footer from "../../component/footer";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';
import "./tp2.scss";


const tp2 = () => {

    return (
        <div>
            <Aside accueil={true}/>
            <Header title="SinglePage Application"/>
            <main className={"tp"}>
                <div>
                    <p>Le but de ce TP est de réaliser une application web en utilisant NodeJs pour le serveur et React
                        pour le
                        front. Cette application gérera un ensemble d'événements. On pourra ainsi consulter la liste
                        d'événement existant, en ajouter, en supprimer.</p>
                    <h3>0- Créer un projet NodeJs</h3>
                    <ul>
                        <li>dans votre terminal créer un dossier</li>
                        <li>tapez la commande npm init, dites oui a tout</li>
                        <li>ajouter une dépendance vers express, nodemon, parcel, react, react-dom
                            <SyntaxHighlighter language="javascript" style={docco}>
                                {"npm i express nodemon parcel react react-dom"}
                            </SyntaxHighlighter>
                        </li>
                    </ul>
                    <h3>1- Exposer une page</h3>
                    <ul>
                        <li>Déclarer un serveur</li>
                        <li>Afficher le texte "Mon premier serveur NodeJs" sur le path "/message"</li>
                        <li>Créez un dossier <code>public</code> à la racine
                            du projet
                        </li>
                        <li>Créez un fichier index.html</li>
                        <li>Dans le fichier serveur.js exposez de manière static le dossier <code>public</code>
                                <SyntaxHighlighter language="javascript" style={docco}>
                                    {'app.use(express.static("public"));'}
                                </SyntaxHighlighter>
                        </li>

                    </ul>
                    <h3>2- Créer une application React</h3>
                    <ul>
                        <li>Créez un dossier src/app à la racine du projet</li>
                        <li>Créez un fichiez index.jsx dans ce dossier
                     <SyntaxHighlighter language="jsx" style={docco}>
                         {`
import React from "react";
import ReactDOM from "react-dom";

let Comp = ()=>{
 return <div>Salut React</div>;
}

ReactDOM.render(<Comp/>, document.getElementById("root"))`
}
                     </SyntaxHighlighter>
                        </li>
                        <li>Configurez parcel : dans le fichier package.json ajoutez un script
                            <SyntaxHighlighter language="javascript" style={docco}>
                                {'"start-web": "parcel ./src/app/index.jsx"'}
                            </SyntaxHighlighter>

                        </li>
                        <li>Vous pourrez ensuite démarrer ce serveur via la commande <code>npm run start-web</code></li>
                        <li>On constate que celui ci démarre sur le port 1234, et ainsi que l'on trouve le js généré sur
                            http://localhost:1234/index.js
                        </li>
                        <li>Il faudra ainsi ajouter dans votre page HTML une balise
                            <SyntaxHighlighter language="javascript" style={docco}>
                                {'<div id="root"></div>'}
                            </SyntaxHighlighter>
                             afin d'y injecter votre composant Comp comme vu ci-dessus
                        </li>
                        <li>Ajouter une balise avant la fermeture de votre balise body,
                            <SyntaxHighlighter language="javascript" style={docco}>
                                {'<script src="http://localhost:1234/index.js"></script>'}
                            </SyntaxHighlighter>
                            ceci permettra d'executer votre code react et ainsi permettre l'affichage de votre application
                        </li>
                    </ul>
                    <h3>3- Enrichir la page en affichant un ensemble de données récupéré depuis notre serveur</h3>
                    <ul>
                        <li>créez une variable globale <SyntaxHighlighter language="javascript"
                                                                          style={docco}>{`const events = [{id:1, name:'Event 1'}, {id:2, name:'Event 2'}]`}</SyntaxHighlighter>
                            dans le fichier server.js, celle ci représentera la liste des événements
                        </li>
                        <li>Exposez une route sur le path "/api/events" permettant de récupérer votre liste d'événements
                 <SyntaxHighlighter language="javascript" style={docco}>
                     {
                         `
 const events = [{id:1, name:"first"}, {id:2, name:"second"}];
 app.get("/api/events", (req, res)=>{
    res.send(events)
 });
                         `
                     }
                 </SyntaxHighlighter>
                        </li>
                    </ul>

                    <ul>
                        <li>Il faudra maintenant appeler notre service depuis notre application react</li>
                        <li>Revenons sur notre fichier index.jsx, et y créer un "Class Component"
                                <SyntaxHighlighter language="jsx" style={docco}>
                                    {`
 class Application extends React.Component {
    constructor(props) {
        super(props);
        // initialisation de l'état du composant
        // ici un tableau d'événements vide
        this.state = {
            events: [],
        }
    }

    render(){
        return(
            <div>Mon app</div>
        )
    }
}`
                }

                                </SyntaxHighlighter>
                        </li>
                        <li>Nous allons maintenant récupérer les données depuis notre serveur afin de les exploiter, pour ce faire nous allons utiliser une fonction du cycle de vie
                            <SyntaxHighlighter language="javascript" style={docco}>
                                {`
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
                                `}
                            </SyntaxHighlighter>
                        </li>
                        <li>Pour finir modifiez la méthode render afin d'y afficher un tableau de vos résultats</li>
                    </ul>
                    <h3>4- Envoyer des données au serveur</h3>
                    <ul>
                        <h4>Côté Serveur</h4>
                        <li>Créez un endpoint permettant d'ajouter un événement a votre liste d'événement existant
                            <SyntaxHighlighter language="javascript" style={docco}>
                                {`
app.post("/api/events", (req, res)=>{
    const event = req.body;
    console.log(event)
    event.id = generateNewId(); // cette methode est à définir
    events.push(event); // j'ajoute dans mon context le nouvel événement
    res.send(events)
});
                            `}
                            </SyntaxHighlighter>
                        </li>

                    </ul>
                    <ul>
                        <h4>Côté Front</h4>
                        <li>Dans cette partie nous allons ajouter un formulaire a notre page html, dans lequel vous aurez un champ de saisie et un bouton de validation. Celui ci permettra l'ajout d'un nouvel événement.
                            <SyntaxHighlighter language="javascript" style={docco}>
                                {
                                    `
// dans un composant fonctionnel
 <form onSubmit={valider}>
    <input type={"text"} value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
    <button>Valider</button>
</form>
                                    `

                                }

                            </SyntaxHighlighter>
                        </li>
                        <li>Vous devrez ensuite ajouter une action sur la validation du formulaire cette action devra appeler votre serveur avec la METHOD POST, et contenant dans son body l'objet à sauvegarder
                            <SyntaxHighlighter language="javascript" style={docco}>
                                {`
const valider=(e)=>{
    // necessaire pour éviter le comportement par defaut de soumission de formulaire
    e.preventDefault();

    // On crée notre event
    let event = {name:name};
    // On le transforme en chaine de caractère afin d'etre transmissible dans la requête
    // "{\\"name\\":\\"Nuit Sombre"\\}"
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
            // Il faudra ici rappeler le service de lecture d'événements
            // afin de permettre le rafraichissement de notre liste d'événements
        })
}                                    
                                    `}
                            </SyntaxHighlighter>
                        </li>
                    </ul>
                    <h3>5- Routing coté React</h3>
                    <ul>
                        <li>Nous utiliserons ici la librairie react-router-dom
                            <SyntaxHighlighter language="javascript" style={docco}>
                                {"npm i react-router-dom"}
                            </SyntaxHighlighter>
                            Je vous invite à lire la doc afin de le mettre en place
                            <p>
                            <a href="https://v5.reactrouter.com/web/guides/quick-start" target="_blank"> react-router-dom V5</a>
                            </p>
                            <p>
                            <a href="https://reactrouter.com/" target="_blank"> react-router-dom V6</a> | <a href="https://reactrouter.com/docs/en/v6/getting-started/overview" target="_blank"> getting started</a>
                            </p>
                        </li>
                        <li>Vous pourrez mettre en place différentes pages dans votre application, créez une page pour les événements et une page pour les participants</li>
                        <li>Pour les participants suivez ce que l'on a fait au dessus afin de créer votre context participant, et les endpoints correspondant.</li>
                        <li>Ajouter une page inscription, vous permettant d'inscrire un participant à un événement.</li>
                    </ul>
                    <h3>6- Base de données</h3>
                    <ul>
                        <li>Le but ici va être de mettre en place une base de données de type PostgreSQL</li>
                        <li>installer les librairie pg et dotenv, la première englobant les ressources nécessaire pour interroger notre base de données, la seconde permettant de créer des variables d'environnement en développement.
                            <SyntaxHighlighter language="javascript" style={docco}>
                                {'npm i pg dotenv'}
                            </SyntaxHighlighter>
                        </li>
                        <li>Créez une base de données, démarrez en une en local ou créez une sur un hebergeur.</li>
                        <li>Créez un fichier .env à la racine de votre projet</li>
                        <li>Complétez ce fichier avec les bonnes informations
                            <SyntaxHighlighter language="javascript" style={docco}>
                                {'POSTGRESQL_ADDON_URI=postgresql://username:password@hostname:port/dbName'}
                            </SyntaxHighlighter>
                        </li>
                        <li>Nous allons ensuite depuis notre serveur nous connecter à cette base
                            <SyntaxHighlighter language="javascript" style={docco}>
                                {
                                    `
                                    De manière synchrone
//import des librairies
const pg = require('pg');
const dotenv = require("dotenv");

//Initialisation de dotenv permettant la lecture en local dans le fichier .env
dotenv.config();
console.log("connecting to", process.env.POSTGRESQL_ADDON_URI);

//Initialisation de la config de la base de données
const pgClient = new pg.Client(process.env.POSTGRESQL_ADDON_URI);
//Connection à la base de données
pgClient.connect();                                    
                                    `
                                }
                            </SyntaxHighlighter>
                        </li>
                        <li>Vous pouvez désormais utiliser le client créé pour effectuer vos requêtes
                            <div style={{display:'grid', gridGap:'20px', gridTemplateColumns:"auto 1fr"}}>
                                <SyntaxHighlighter language="javascript" style={docco}>
                                    {`
const events = async () => {
    try{
        const res = await pgClient.query({
            name: "read-events",
            text: 'select id, name, date
                   from event;',
        });
        return res.rows;
    } catch(err) {
        // traitement des erreurs ici
    }
}

const event = async (id) => {
    try{
        const res = await pgClient.query({
            name: "read-event-"+id,
            text: 'select id, name, date
                   from event where id=$1;',
            values: [id]
        });
        // Il faudra bien évidemment traiter les cas 
        // ou la requête ne nous ramène rien
        return res.rows[0];
    } catch(err) {
        // traitement des erreurs ici
    }
}                            
                            `}
                                </SyntaxHighlighter>
                                <SyntaxHighlighter language="javascript" style={docco}>
                                    {`
const events = async () => {
    try{
        const res = await pgClient.query({
            name: "read-events",
            text: 'select id, name, date
                   from event;',
        });
        return res.rows;
    } catch(err) {
        // traitement des erreurs ici
    }
}

const event = async (id) => {
    try{
        const res = await pgClient.query({
            name: "read-event-"+id,
            text: 'select id, name, date
                   from event where id=$1;',
            values: [id]
        });
        // Il faudra bien évidemment traiter les cas 
        // ou la requête ne nous ramène rien
        return res.rows[0];
    } catch(err) {
        // traitement des erreurs ici
    }
}                            
                            `}
                                </SyntaxHighlighter>
                            </div>
                        </li>

                    </ul>
                </div>
            </main>
            <Footer author="Karim Benyahia" curse="AAW"/>

        </div>
    )
}

export default tp2;
