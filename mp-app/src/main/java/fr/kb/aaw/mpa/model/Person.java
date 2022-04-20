package fr.kb.aaw.mpa.model;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name="PERSON")
public class Person {

    @Id
    @GeneratedValue
    private UUID id;
    private String firstName;
    private String lastName;
    @ManyToOne
    private Event event;

    public Person() {

    }

    public String getFirstName() {
        return firstName;
    }

    public Person setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public Person setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public UUID getId() {
        return id;
    }

    public Person setId(UUID id) {
        this.id = id;
        return this;
    }

    public Event getEvent() {
        return event;
    }

    public Person setEvent(Event event) {
        this.event = event;
        return this;
    }
}
