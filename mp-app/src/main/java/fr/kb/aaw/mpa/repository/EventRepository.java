package fr.kb.aaw.mpa.repository;

import fr.kb.aaw.mpa.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Event, String> {

}
