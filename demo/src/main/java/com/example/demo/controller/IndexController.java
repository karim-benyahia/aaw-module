package com.example.demo.controller;

import com.example.demo.context.Context;
import com.example.demo.model.Event;
import com.example.demo.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Controller
public class IndexController {

    @Autowired
    Context context;

    @GetMapping({"/", "/index.html"})
    public String index(Model model) {
        return "index";
    }

    @GetMapping({"/events"})
    public String eventsPages(Model model) {
        model.addAttribute("events", context.getEvents());
        model.addAttribute("eventForm", new Event());
        return "events";
    }

    @GetMapping({"/persons"})
    public String personsPage(Model model) {
        model.addAttribute("persons", context.getPersons());
        model.addAttribute("personForm", new Person());
        return "persons";
    }


    @PostMapping("/event")
    public String addEvent(Model model, Event event) {
        context.getEvents().add(event);
        return eventsPages(model);

    }

}
