package fr.kb.aaw.mpa.controller;

import fr.kb.aaw.mpa.form.PersonForm;
import fr.kb.aaw.mpa.model.Event;
import fr.kb.aaw.mpa.model.EventRecord;
import fr.kb.aaw.mpa.model.Person;
import fr.kb.aaw.mpa.model.PersonRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class PersonController {

    public static List<PersonRecord> persons = new ArrayList<>();

    static {
        persons.add(new PersonRecord(1,"Bill", "Gates", EventController.events.get(0)));
        persons.add(new PersonRecord(2,"Steve", "Jobs", EventController.events.get(1)));
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


    @GetMapping(value = { "/person" })
    public String showPersonListPage(Model model) {

        model.addAttribute("author", author);
        model.addAttribute("curse", curse);
        model.addAttribute("title", title);
        model.addAttribute("persons", persons);
        model.addAttribute("events", EventController.events);
        return "personList";
    }

    @GetMapping(value = { "/person/add" })
    public String showAddPersonPage(Model model,@RequestParam(required = false) Integer event) {

        PersonForm personForm = new PersonForm("", "", event);

        model.addAttribute("personForm", personForm);
        model.addAttribute("author", author);
        model.addAttribute("curse", curse);
        model.addAttribute("title", title);
        model.addAttribute("events", EventController.events);
        return "addPerson";
    }



    @PostMapping(value = { "/person" })
    public String savePerson(Model model, @ModelAttribute("personForm") PersonForm personForm) {

        String firstName = personForm.firstName();
        String lastName = personForm.lastName();
        Integer eventId = personForm.eventId();

        if (!StringUtils.isEmpty(firstName)
                && !StringUtils.isEmpty(lastName)) {
            Integer max = persons.stream().map(p -> p.id())
                    .max((a, b) -> a - b).orElse(0);

            EventRecord event = EventController.events.stream()
                    .filter(e->e.id()==eventId)
                    .findFirst()
                    .orElseThrow(()->new IllegalStateException("L'evenement n'existe pas"));

            PersonRecord newPerson = new PersonRecord(max + 1, firstName, lastName, event);
            persons.add(newPerson);

            return "redirect:/person";
        }

        model.addAttribute("errorMessage", errorMessage);
        return "addPerson";
    }

    @DeleteMapping(value = { "/person/{id}" })
    public String delPerson(Model model, @PathVariable("id") Integer id) {


        if (id != null) {
            persons = persons.stream().filter(p->p.id()!=id).collect(Collectors.toList());
            return "redirect:/person";
        }

        model.addAttribute("errorMessage", errorMessage);
        return "index";
    }

}
