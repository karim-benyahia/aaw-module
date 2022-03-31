package fr.kb.aaw.mpa.controller;

import fr.kb.aaw.mpa.form.EventForm;
import fr.kb.aaw.mpa.form.PersonForm;
import fr.kb.aaw.mpa.model.Event;
import fr.kb.aaw.mpa.model.EventRecord;
import fr.kb.aaw.mpa.model.Person;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class EventController {

    public static List<EventRecord> events = new ArrayList<>();

    static {
        events.add(new EventRecord(1,"Mud Day", LocalDate.now().toString()));
        events.add(new EventRecord(2,"Vide grenier", LocalDate.now().toString()));
    }

    // Injectez (inject) via application.properties.
    @Value("${welcome.message}")
    private String message;
    @Value("${author.message}")
    private String author;
    @Value("${curse.message}")
    private String curse;
    @Value("${title.message}")
    private String title;

    @Value("${error.message}")
    private String errorMessage;


    @GetMapping(value = {"/event"})
    public String showEventListPage(Model model) {

        model.addAttribute("author", author);
        model.addAttribute("curse", curse);
        model.addAttribute("title", title);
        model.addAttribute("events", events);
        return "eventList";
    }

    @GetMapping(value = {"/event/add"})
    public String showAddEventPage(Model model) {

        EventForm eventForm = new EventForm("", "");
        model.addAttribute("eventForm", eventForm);
        model.addAttribute("author", author);
        model.addAttribute("curse", curse);
        model.addAttribute("title", title);
        return "addEvent";
    }

    @PostMapping(value = {"/event"})
    public String saveEvent(Model model, @ModelAttribute("event") EventForm event) {

        String firstName = event.name();
        String date = event.date();

        if (!StringUtils.isEmpty(firstName)) {
            Integer max = events.stream().map(p -> p.id())
                    .max((a, b) -> a - b).orElse(0);

            EventRecord newEvent = new EventRecord(max + 1, firstName, date);
            events.add(newEvent);

            return "redirect:/event";
        }

        model.addAttribute("errorMessage", errorMessage);
        return "event";
    }

    @DeleteMapping(value = {"/event/{id}"})
    public String delEvent(Model model, @PathVariable("id") Integer id) {


        if (id != null) {
            events = events.stream().filter(p -> p.id() != id).collect(Collectors.toList());
            return "redirect:/event";
        }

        model.addAttribute("errorMessage", errorMessage);
        return "index";
    }

}
