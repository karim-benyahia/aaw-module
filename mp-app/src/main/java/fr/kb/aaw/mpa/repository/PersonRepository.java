package fr.kb.aaw.mpa.repository;

import fr.kb.aaw.mpa.model.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PersonRepository extends CrudRepository<Person, String> {
    Iterable<? extends Person> findByEventId(String id);
}
