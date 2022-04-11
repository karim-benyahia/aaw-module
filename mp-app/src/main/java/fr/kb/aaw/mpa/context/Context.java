package fr.kb.aaw.mpa.context;

import fr.kb.aaw.mpa.model.EventRecord;
import fr.kb.aaw.mpa.model.PersonRecord;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class Context {
    private List<EventRecord> events = new ArrayList<>();

    private List<PersonRecord> persons = new ArrayList<>();

    public Context() {
        events.add(new EventRecord(1, "Mud Day", LocalDate.now().toString()));
        events.add(new EventRecord(2, "Vide grenier", LocalDate.now().toString()));

        persons.add(new PersonRecord(1, "Bill", "Gates", events.get(0)));
        persons.add(new PersonRecord(2, "Steve", "Jobs", events.get(1)));
    }

    public List<EventRecord> getEvents() {
        return events;
    }

    public void setEvents(List<EventRecord> events) {
        this.events = events;
    }

    public List<PersonRecord> getPersons() {
        return persons;
    }

    public void setPersons(List<PersonRecord> persons) {
        this.persons = persons;
    }

    public void add(EventRecord newEvent) {
        this.events.add(newEvent);
    }

    public void add(PersonRecord newPerson) {
        this.persons.add(newPerson);
    }
}
