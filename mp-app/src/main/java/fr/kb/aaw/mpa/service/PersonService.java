package fr.kb.aaw.mpa.service;

import fr.kb.aaw.mpa.context.Context;
import fr.kb.aaw.mpa.model.Event;
import fr.kb.aaw.mpa.model.EventRecord;
import fr.kb.aaw.mpa.model.Person;
import fr.kb.aaw.mpa.model.PersonRecord;
import fr.kb.aaw.mpa.repository.EventRepository;
import fr.kb.aaw.mpa.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PersonService {

    @Autowired
    private Context context;
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private EventRepository eventRepository;

    @Value("${fr.kb.context}")
    private Boolean withContext;

    public void delPerson(String id) {
        if (withContext) {
            List<PersonRecord> personsFiltered = context.persons()
                    .stream()
                    .filter(p -> p.id() != id)
                    .collect(Collectors.toList());
            context.updatePersons(personsFiltered);
        } else {
            personRepository.deleteById(id);
        }
    }

    public void savePerson(String firstName, String lastName, String eventId) {
        if (withContext) {
            EventRecord event = context.events()
                    .stream()
                    .filter(e -> e.id() == eventId)
                    .findFirst()
                    .orElseThrow(() -> new IllegalStateException("L'evenement n'existe pas"));

            PersonRecord newPerson = new PersonRecord(UUID.randomUUID().toString(), firstName, lastName, event);
            context.add(newPerson);
        } else {
            Optional<Event> byId = eventRepository.findById(eventId);
            byId.ifPresent(event -> {
                personRepository.save(new Person().setFirstName(firstName)
                        .setLastName(lastName)
                        .setEvent(event)
                        .setId(UUID.randomUUID().toString()));
            });
        }
    }

    public List<PersonRecord> persons() {
        if (withContext) {
            return context.persons();
        } else {
            return StreamSupport.stream(personRepository.findAll().spliterator(), false)
                    .map(PersonRecord::new)
                    .collect(Collectors.toList());
        }
    }
}
