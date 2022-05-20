import React, {useState, useEffect} from "react";

import {Link, useLocation} from "react-router-dom";
import "./aside.scss";

const menu = [
    {
        name: "home",
        label: "Home",
        href: "/",
        icon: "fas fa-home"
    },
    {
        name: "accueil",
        label: "Accueil",
        href: "https://aaw-module.serliapps.dev",
        icon: "fas fa-home",
        extern:true
    },
    {
        name: "event",
        icon: "fas fa-calendar",
        label: "Evénements",
        children: [
            {
                name: "event-list",
                label: "Liste",
                href: "/event",
                icon: "fas fa-list",
            },
            {
                name: "event-add",
                label: "Ajout d'événements",
                icon: "fas fa-calendar-plus",
                href: "/event/add",
            }
        ]
    },
    {
        name: "person",
        label: "Participants",
        icon: "fas fa-user",
        children: [
            {
                name: "person-list",
                label: "Liste",
                icon: "fas fa-list",
                href: "/person",
            },
            {
                name: "person-add",
                label: "Ajout de participants",
                icon: "fas fa-user-plus",
                href: "/person/add",
            }
        ]
    }


];

const menuAccueil = [
    {
        name: "curse",
        label: "Support de cours",
        href: "/curse",
        icon: "fas fa-book"
    },
    {
        name: "TP",
        label: "tp",
        icon: "fas fa-dumbbell",
        children: [
            {
                name: "tp1",
                label: "TP1 SpringBoot - Thymeleaf",
                href: "https://aaw-module.serliapps.dev/tp1",
                icon: "fas fa-dumbbell",
                extern:true
            },
            {
                name: "tp2",
                label: " TP2 NodeJS - React",
                href: "/tp2",
                icon: "fas fa-dumbbell",
            },
            {
                name: "tp3",
                label: "TP3/TP6 SpringBoot Security",
                href: "https://aaw-module.serliapps.dev/tp3",
                icon: "fas fa-dumbbell",
                extern:true
            },
        ]
    },
    {
        name: "webapp",
        label: "Exemple Web App",
        icon: "fas fa-dumbbell",
        children: [
            {
                name: "spring-thy",
                label: "SpringBoot + Thymeleaf",
                href: "https://aaw-module.serliapps.dev/index-spring",
                icon: "fas fa-desktop",
                extern:true
            },
            {
                name: "nodejs-react",
                label: " Node + React app",
                href: "/",
                icon: "fas fa-desktop",
                extern:true
            }
        ]
    },
    {
        name: "projet",
        label: "Projet",
        icon: "fas fa-tasks",
        extern:true,
        href:"https://aaw-module.serliapps.dev/projet"
    }


];

const Li = ({active, menu, onClick}) => {

    const {name, href, icon, label, children, extern} = menu;
    return (
        <>
            <li className={active === href ? "active" : ""} onClick={() => !children && onClick(name)}>
                {
                    href && active === href ?
                        <span><i className={icon}></i>{label}</span>
                        :
                        (
                            extern ?
                                <a href={href}><i className={icon}></i> {label}</a>
                                :
                                <Link to={{pathname: href}}><i className={icon}></i> {label}</Link>
                        )
                }

            </li>
            {
                children &&
                <ul>
                    {
                        children.map(c => <Li key={c.name} active={active} menu={c} onClick={onClick}/>)
                    }
                </ul>
            }
        </>
    );
}

const Aside = ({accueil, showAside}) => {


    const [active, setActive] = useState("home")
    const location = useLocation();

    useEffect(() => {
        setActive(location.pathname);
    }, [location])

    return (

        <aside className={showAside?"active":""}>
            <div className="menu">
                <nav>

                    <ul>
                        {
                            accueil ?
                                menuAccueil.map(m => <Li key={m.name} active={active} menu={m} onClick={setActive}/>)
                                :
                                menu.map(m => <Li key={m.name} active={active} menu={m} onClick={setActive}/>)
                        }
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Aside;
