package fr.kb.aaw.mpa.context;

import fr.kb.aaw.mpa.model.EventRecord;
import fr.kb.aaw.mpa.model.PersonRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Component
public record Context(List<EventRecord> events,List<PersonRecord> persons) {

    public Context() {
        this(new ArrayList<>(), new ArrayList<>());
        events().add(new EventRecord(UUID.randomUUID(), "Mud Day", new Date()));
        events().add(new EventRecord(UUID.randomUUID(), "Vide grenier", new Date()));

        persons().add(new PersonRecord(UUID.randomUUID(), "Bill", "Gates", events.get(0)));
        persons().add(new PersonRecord(UUID.randomUUID(), "Steve", "Jobs", events.get(1)));
    }


    public void add(EventRecord newEvent) {
        this.events.add(newEvent);
    }

    public void add(PersonRecord newPerson) {
        this.persons.add(newPerson);
    }

    public void updatePersons(List<PersonRecord> personsFiltered) {
        persons.clear();
        persons.addAll(personsFiltered);
    }

    public void updateEvents(List<EventRecord> eventsFiltered) {
        events.clear();
        events.addAll(eventsFiltered);
    }
}
