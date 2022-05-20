import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {Routes, Route, BrowserRouter, Outlet} from "react-router-dom";

import Header from "./header";
import Aside from "./aside";
import Footer from "./footer"
import Events from "../views/event/events"
import AddEvent from "../views/event/add-event"
import Persons from "../views/person/persons"
import Curse from "../views/curse/curse"
import AddPerson from "../views/person/add-person"
import Home from "../views/home"
import Tp2 from "../views/tp/tp2"

const App = () => {
    const [showAside, setShowAside] = useState(false);

    const callShowAside = () => {
        setShowAside(!showAside);
        console.log("showAside",showAside);
    }

    const Main = (props) => {
        return (
            <div>
                <Aside showAside={showAside}/>
                <Header title="SinglePage Application" callShowAside={callShowAside}/>
                <Outlet/>
                <Footer author="Karim Benyahia" curse="AAW"/>
            </div>
        )
    }

    return (

        <Routes>
            <Route path="/" element={<Main/>}>
                <Route index element={<Home/>}/>
                <Route path="event" element={<Events/>}/>
                <Route path="event/add" element={<AddEvent/>}/>
                <Route path="person" element={<Persons/>}/>
                <Route path="person/add" element={<AddPerson/>}/>
            </Route>
            <Route path="tp2" element={<Tp2/>}/>
            <Route path="curse" element={<Curse/>}/>
        </Routes>

    )


}

export default App;

