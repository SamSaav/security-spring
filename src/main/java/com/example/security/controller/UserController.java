package com.example.security.controller;

import com.example.security.model.Person;
import com.example.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    @ResponseBody
    public List<Person> getUsuarios() {
        return userService.getUsers();
    }

    @GetMapping("/user/{id}")
    @ResponseBody
    public Person getUsuario(@PathVariable("id") Long id) {
        return userService.getUser(id);
    }

    @PostMapping("/user")
    @ResponseBody
    public Person postUser(@RequestParam("email") String email, @RequestParam("password") String password) {
        return userService.findByEmail(email, password);
    }

}
