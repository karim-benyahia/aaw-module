package com.example.demo.context;

import com.example.demo.model.Event;
import com.example.demo.model.Person;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class Context {

    private List<Event> events;
    private List<Person> persons;


   public Context() {
       events = new ArrayList<>();
       events.add(new Event(UUID.randomUUID(), "the Event",
               "12/02/2023"));
       events.add(new Event(UUID.randomUUID(), "the Other Event", "12/02/2030"));

       persons=new ArrayList<>();
       persons.add(new Person(UUID.randomUUID(), "Pierre", "Hi", events.get(0)));
       persons.add(new Person(UUID.randomUUID(), "Paul", "Hi", events.get(1)));
   }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public List<Person> getPersons() {
        return persons;
    }

    public void setPersons(List<Person> persons) {
        this.persons = persons;
    }
}
