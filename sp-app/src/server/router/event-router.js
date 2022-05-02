const express = require("express");
const router = express.Router();
const {events, deleteEvent} = require("../db");

router.get("/", (req, res)=>{
    events()
        .then(resp=>{
            console.log(resp);
            res.send(resp);
        })
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
    deleteEvent(req.params.id)
        .then(res=>{
            eventRepo.events()
                .then(resp=>{
                    console.log(resp);
                    res.send(resp);
                })
        })
})

module.exports= {
    eventRouter:router,
}
