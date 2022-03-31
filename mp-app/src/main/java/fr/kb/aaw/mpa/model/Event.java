package fr.kb.aaw.mpa.model;

import java.util.Date;

public class Event {

    private String name;
    private String date;
    private Integer id;

    public Event() {

    }

    public Event(Integer id, String name, String date) {
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



    public Integer getId() {
        return id;
    }

    public Event setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getDate() {
        return date;
    }

    public Event setDate(String date) {
        this.date = date;
        return this;
    }
}
