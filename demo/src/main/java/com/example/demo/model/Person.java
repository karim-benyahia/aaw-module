package com.example.demo.model;

import java.util.UUID;

public class Person {

    private UUID id;
    private String firstName;
    private String lastName;
    private Event event;

    public Person() {
    }

    public Person(UUID id, String firstName, String lastName, Event event) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.event = event;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}
