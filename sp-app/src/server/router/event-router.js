const express = require("express");
const router = express.Router();

let events = [
    {
        id:1,
        name:"Mud Day",
        date:new Date()
    },
    {
        id:2,
        name:"Vide grenier",
        date:new Date()
    }
]

router.get("/", (req, res)=>{
    res.send(events);
})

router.post("/", (req, res)=>{
    const event = req.body;

    let values = events.map(p => p.id);
    let max = Math.max(...values);
    event.id = max + 1;
    events.push(event);
    res.send(event);
})

router.delete("/:id", (req, res)=>{
    events = events.filter(p=>p.id !== Number(req.params.id))
    res.send(events);
})

module.exports= {
    eventRouter:router,
    events
}
