package fr.kb.aaw.mpa.controller;

import fr.kb.aaw.mpa.context.Context;
import fr.kb.aaw.mpa.service.EventService;
import fr.kb.aaw.mpa.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;

public class BaseController {

    @Value("${author.message}") private String author;
    @Value("${curse.message}") private String curse;
    @Value("${title.message}") private String title;

    @Value("${error.message}")
    protected String errorMessage;


    @Autowired
    protected PersonService personService;
    @Autowired
    protected EventService eventService;

    public void initModel(Model model) {
        model.addAttribute("author", author);
        model.addAttribute("curse", curse);
        model.addAttribute("title", title);
    }
}
