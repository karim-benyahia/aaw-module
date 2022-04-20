package fr.kb.aaw.mpa.model;

import java.util.UUID;

public record PersonRecord(UUID id, String firstName, String lastName, EventRecord event) {

    public PersonRecord(Person person){
        this(person.getId(), person.getFirstName(), person.getLastName(), new EventRecord(person.getEvent()));
    }
}

