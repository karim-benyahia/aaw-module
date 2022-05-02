const express = require("express");
const router = express.Router();
const {persons, deletePerson, event, addPerson} = require("../db");
const {v4} = require('uuid');

router.get("/", async (req, res) => {
    let listofPersons = await persons()
    let list = listofPersons.map(async pers => {
        let ev = await event(pers.event_id)
        return ev;
    });
    let events = await Promise.all(list);
    listofPersons = listofPersons.map((pers, index)=>{
        pers.event = events[index];
        return pers;
    })

    console.log("Participants", listofPersons);
    res.send(listofPersons);
})

function getNextId() {
    return v4();
}

router.post("/", (req, res) => {
    const person = req.body;
    person.id = getNextId();
    addPerson(person)
    res.send(persons);
})

router.delete("/:id", (req, res) => {
    deletePerson(req.params.id)
        .then(res => {
            persons()
                .then(resp => {
                    console.log(resp);
                    res.send(resp);
                })
        })
})

module.exports = {
    personRouter: router
}
