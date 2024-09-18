package fr.kb.aaw.mpa.controller;

import fr.kb.aaw.mpa.form.PersonForm;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import java.util.UUID;

@Controller
public class PersonController extends BaseController {

    @GetMapping(value = {"/person"})
    public String showPersonListPage(Model model) {

        initModel(model);
        model.addAttribute("persons", personService.persons());
        model.addAttribute("events", eventService.events());
        return "personList";
    }

    @GetMapping(value = {"/person/add"})
    public String showAddPersonPage(Model model, @RequestParam(required = false) String event) {

        PersonForm personForm = new PersonForm("", "", event);

        model.addAttribute("personForm", personForm);
        initModel(model);
        model.addAttribute("events", eventService.events());
        return "addPerson";
    }


    @PostMapping(value = {"/person"})
    public String savePerson(Model model, @ModelAttribute("personForm") PersonForm personForm) {

        String firstName = personForm.firstName();
        String lastName = personForm.lastName();
        String eventId = personForm.eventId();

        if (!StringUtils.isEmpty(firstName)
                && !StringUtils.isEmpty(lastName)) {
            personService.savePerson(firstName, lastName, eventId);

            return "redirect:/person";
        }

        model.addAttribute("errorMessage", errorMessage);
        return "addPerson";
    }

    @DeleteMapping(value = {"/person/{id}"})
    public String delPerson(Model model, @PathVariable("id") String id) {
        if (id != null) {
            personService.delPerson(id);
            return "redirect:/person";
        }

        model.addAttribute("errorMessage", errorMessage);
        return "index";
    }

}
