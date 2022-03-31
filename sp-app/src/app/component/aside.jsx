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

const Li = ({active, menu, onClick}) => {

    const {name, href, icon, label, children} = menu;
    return (
        <>
            <li className={active === href ? "active" : ""} onClick={() => !children && onClick(name)}>
                {
                    href && active === href ?
                        <i className={icon}>{label}</i>
                        :
                        <Link to={{pathname: href}}><i className={icon}>{label}</i> </Link>
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

const Aside = () => {


    const [active, setActive] = useState("home")
    const location = useLocation();

    useEffect(() => {
        setActive(location.pathname);
    }, [location])

    return (
        <aside>
            <div className="menu">
                <nav>

                    <ul>
                        {
                            menu.map(m => <Li key={m.name} active={active} menu={m} onClick={setActive}/>)
                        }
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Aside;
