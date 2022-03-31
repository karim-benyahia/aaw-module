package fr.kb.aaw.mpa.model;

public class Person {

    private String firstName;
    private String lastName;
    private Integer id;
    private Event event;

    public Person() {

    }

    public Person(Integer id, String firstName, String lastName, Event event) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id=id;
        this.event = event;
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

    public Integer getId() {
        return id;
    }

    public Person setId(Integer id) {
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
