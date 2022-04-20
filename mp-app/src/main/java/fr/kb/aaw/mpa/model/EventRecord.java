package fr.kb.aaw.mpa.model;

import javax.persistence.Entity;
import java.util.Date;
import java.util.UUID;

public record EventRecord(UUID id, String name, String date) {
    public EventRecord(Event e){
        this(e.getId(), e.getName(), e.getDate());
    }
}
