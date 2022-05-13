const express = require("express");
const {v4} = require('uuid');

const app= express();

app.use(express.json());
app.use(express.static('public'));

const events = [{id:1, name:"first"}, {id:2, name:"second"}];

//recuperation des events
app.get("/api/events", (req, res)=>{
    res.send(events);
});

app.post("/api/events", (req, res)=>{
    const event = req.body;
    console.log(event)
    event.id = v4();
    events.push(event);
    res.send(events)
});

app.listen(3000, ()=>{
    console.log("serveur démarré")
})
