const express = require("express");
const app= express();

app.use(express.static('public'));


app.get("/api/events", (req, res)=>{
    res.send([{id:1, name:"first"}, {id:2, name:"second"}])
});

app.listen(3000, ()=>{
    console.log("serveur démarré")
})
