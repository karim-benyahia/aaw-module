import React from "react";
import Aside from "../../component/aside";
import Header from "../../component/header";
import Footer from "../../component/footer";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs';
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
                     <SyntaxHighlighter language="javascript" style={docco}>
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
                                <SyntaxHighlighter language="javascript" style={docco}>
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
                        <li>Créez un endpoint permettant d'ajouter un événement a votre liste d'événement existant</li>
                    </ul>
                    <ul>
                        <h4>Côté Front</h4>
                        <li>Dans cette partie nous allons ajouter un formulaire a notre page html, dans lequel vous aurez un champ de saisie et un bouton de validation. Celui ci permettra l'ajout d'un nouvel événement.</li>
                        <li>Vous devrez ensuite ajouter une action sur la validation du formulaire cette action devra appeler votre serveur avec la METHOD POST, et contenant dans son body l'objet à sauvegarder</li>
                    </ul>
                    <h3>5- Routing coté React</h3>
                    <ul>
                        <li>Nous utiliserons ici la librairie react-router-dom
                            <SyntaxHighlighter language="javascript" style={docco}>
                                {"npm i react-router-dom"}
                            </SyntaxHighlighter>
                            Je vous invite par manque de temps à lire la doc afin de le mettre en place
                            <a href="https://v5.reactrouter.com/web/guides/quick-start" target="_blank"> react-router-dom</a>
                        </li>
                        <li>Vous pourrez mettre en place différentes pages dans votre application, créez une page pour les événements et une page pour les participants</li>
                        <li>Pour les participants suivez ce que l'on a fait au dessus afin de créer votre context participant, et les endpoints correspondant.</li>
                        <li>Ajouter une page inscription, vous permettant d'inscrire un participant à un événement.</li>
                    </ul>

                </div>
            </main>
            <Footer author="Karim Benyahia" curse="AAW"/>

        </div>
    )
}

export default tp2;
