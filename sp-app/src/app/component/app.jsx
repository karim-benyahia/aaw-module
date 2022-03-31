import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {Routes, Route, BrowserRouter, Outlet} from "react-router-dom";

import Header from "./header";
import Aside from "./aside";
import Footer from "./footer"
import Events from "../views/event/events"
import AddEvent from "../views/event/add-event"
import Persons from "../views/person/persons"
import AddPerson from "../views/person/add-person"
import Home from "../views/home"

const App = () => {

    const Main = () => {
        return (
            <div>

                <Aside/>
                <Header title="SinglePage Application"/>
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
        </Routes>

    )


}

export default App;

