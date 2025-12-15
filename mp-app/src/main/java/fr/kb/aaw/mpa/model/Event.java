package fr.kb.aaw.mpa.model;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name="EVENT")
public class Event {

    @Column(name="nom")
    private String name;
    private Date date;

    @Id
    private String id;

    public Event() {

    }

    public Event(String id, String name, Date date) {
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



    public String getId() {
        return id;
    }

    public Event setId(String id) {
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
