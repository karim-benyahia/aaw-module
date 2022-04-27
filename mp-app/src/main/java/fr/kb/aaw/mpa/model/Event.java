package fr.kb.aaw.mpa.model;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name="EVENT")
public class Event {

    private String name;
    private Date date;

    @Id
    @GeneratedValue
    private UUID id;

    public Event() {

    }

    public Event(UUID id, String name, Date date) {
        this.name = name;
        this.date = date;
        this.id=id;
    }

    public String getName() {
        return name;
    }

    public Event setName(String firstName) {
        this.name = firstName;
        return this;
    }



    public UUID getId() {
        return id;
    }

    public Event setId(UUID id) {
        this.id = id;
        return this;
    }

    public Date getDate() {
        return date;
    }

    public Event setDate(Date date) {
        this.date = date;
        return this;
    }
}
