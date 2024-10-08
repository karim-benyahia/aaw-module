package fr.kb.aaw.mpa.controller;

import com.fasterxml.jackson.databind.DatabindException;
import fr.kb.aaw.mpa.context.Context;
import fr.kb.aaw.mpa.form.EventForm;
import fr.kb.aaw.mpa.model.EventRecord;
import fr.kb.aaw.mpa.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
public class EventController extends BaseController {


    @GetMapping(value = {"/event"})
    public String showEventListPage(Model model) {
        initModel(model);
        model.addAttribute("events", eventService.events());
        return "eventList";
    }

    @GetMapping(value = {"/event/add"})
    public String showAddEventPage(Model model) {
        EventForm eventForm = new EventForm("", "");
        model.addAttribute("eventForm", eventForm);
        initModel(model);
        return "addEvent";
    }

    @PostMapping(value = {"/event"})
    public String saveEvent(Model model, @ModelAttribute("event") EventForm event) {

        String firstName = event.name();
        String dateString = event.date();

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try {
            date = formatter.parse(dateString);
        } catch (ParseException e) {
            model.addAttribute("errorMessage", "La date fournie n'est pas valide");
            return "event";
        }

        if (!StringUtils.isEmpty(firstName)) {
            eventService.saveEvent(firstName, date);
            return "redirect:/event";
        }

        model.addAttribute("errorMessage", errorMessage);
        return "event";
    }

    @DeleteMapping(value = {"/event/{id}"})
    public String delEvent(Model model, @PathVariable("id") String id) {


        if (id != null) {
            eventService.delEvent(id);
            return "redirect:/event";
        }

        model.addAttribute("errorMessage", errorMessage);
        return "index";
    }

}
