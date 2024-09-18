const express = require("express");
const router = express.Router();
const {events, deleteEvent, addEvent} = require("../db");

const {v4} = require('uuid');

router.get("/", (req, res)=>{
    events()
        .then(resp=>{
            console.log(resp);
            res.send(resp);
        })
})

router.post("/", (req, res)=>{
    const event = req.body;
    event.id = v4()+"";
    addEvent(event);
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
