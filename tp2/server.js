const express = require("express");
const app= express();

app.use(express.static('public'));


const events = [{id:1, name:"first"}, {id:2, name:"second"}];
app.get("/api/events", (req, res)=>{
    res.send(events)
});

app.listen(3000, ()=>{
    console.log("serveur démarré")
})
