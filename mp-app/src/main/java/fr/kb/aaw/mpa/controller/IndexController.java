package fr.kb.aaw.mpa.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController extends BaseController{

    // Injectez (inject) via application.properties.
    @Value("${welcome.message}")
    private String message;
    @Value("${author.message}")
    private String author;
    @Value("${curse.message}")
    private String curse;
    @Value("${title.message}")
    private String title;

    @GetMapping(value = {"/", "/index"})
    public String index(Model model) {

        model.addAttribute("message", message);
        initModel(model);
        model.addAttribute("title", "Architecture des Applications WEB");

        return "index";
    }


    @GetMapping(value = { "/index-spring"})
    public String indexSpring(Model model) {

        model.addAttribute("message", message);
        initModel(model);
        model.addAttribute("title", "Multipage Application");

        return "index-spring";
    }

    @GetMapping(value = { "/tp1"})
    public String tp1(Model model) {

        model.addAttribute("message", message);
        initModel(model);
        model.addAttribute("title", "TP 1");

        return "tp1";
    }

    @GetMapping(value = { "/tp2"})
    public String tp2(Model model) {

        model.addAttribute("message", message);
        initModel(model);
        model.addAttribute("title", "PROJET");

        return "tp2";
    }

    @GetMapping(value = { "/tp3"})
    public String tp3(Model model) {

        model.addAttribute("message", message);
        initModel(model);
        model.addAttribute("title", "TP 3");

        return "tp3";
    }

    @GetMapping(value = {"/curse"})
    public String curse(Model model) {
        initModel(model);
        return "curse";
    }


}
