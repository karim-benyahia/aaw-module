const express = require("express");
const router = express.Router();
const {persons, deletePerson} = require("../db");
const {events} = require("./event-router");
import { v4 as uuidv4 } from 'uuid';

router.get("/", (req, res)=>{
    persons()
        .then(res.send)
    ;
})

function getNextId() {
    return uuidv4();
}

router.post("/", (req, res)=>{
    const person = req.body;
    person.id = getNextId();
    persons.push(person);
    res.send(persons);
})

router.delete("/:id", (req, res)=>{
    deletePerson(req.params.id)
        .then(res=>{
            persons()
                .then(res.send)
        })
})

module.exports= {
    personRouter:router,
    persons
}
