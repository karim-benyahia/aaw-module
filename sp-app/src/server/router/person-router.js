const express = require("express");
const router = express.Router();

const {events} = require("./event-router");

let persons = [
    {
        id:1,
        firstName:"Bill",
        lastName:"Gates",
        event :events[0]
    },
    {
        id:2,
        firstName:"Bill",
        lastName:"Cowsby",
        event :events[1]
    }
]


router.get("/", (req, res)=>{
    res.send(persons);
})

router.post("/", (req, res)=>{
    const person = req.body;

    let values = persons.map(p => p.id);
    let max = Math.max(...values);
    person.id = max + 1;
    persons.push(person);
    res.send(persons);
})

router.delete("/:id", (req, res)=>{
    persons = persons.filter(p=>p.id !== Number(req.params.id))
    res.send(persons);
})

module.exports= {
    personRouter:router,
    persons
}
