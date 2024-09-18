package fr.kb.aaw.mpa.service;

import fr.kb.aaw.mpa.context.Context;
import fr.kb.aaw.mpa.model.Event;
import fr.kb.aaw.mpa.model.EventRecord;
import fr.kb.aaw.mpa.model.Person;
import fr.kb.aaw.mpa.repository.EventRepository;
import fr.kb.aaw.mpa.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private Context context;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private PersonRepository personRepository;
    @Value("${fr.kb.context}")
    private Boolean withContext;

    public void delEvent(String id) {
        if (withContext) {
            List<EventRecord> eventsFiltered = context.events()
                    .stream()
                    .filter(p -> p.id() != id)
                    .collect(Collectors.toList());
            context.updateEvents(eventsFiltered);
        } else {
            personRepository.deleteAll(personRepository.findByEventId(id));
            eventRepository.deleteById(id);
        }
    }

    public void saveEvent(String firstName, Date date) {
        if (withContext) {
            EventRecord newEvent = new EventRecord(UUID.randomUUID().toString(), firstName, date);
            context.add(newEvent);
        } else {
            eventRepository.save(new Event().setName(firstName).setDate(date));
        }
    }

    public List<EventRecord> events(){
        if(withContext){
            return context.events();
        }else{
            return eventRepository.findAll()
                    .stream()
                    .map(EventRecord::new)
                    .collect(Collectors.toList());
        }
    }


}
