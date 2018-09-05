package com.example.security.controller;

import com.example.security.model.User;
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
    public List<User> getUsuarios() {
        return userService.getUsers();
    }

    @GetMapping("/user/{id}")
    @ResponseBody
    public User getUsuario(@PathVariable("id") Long id) {
        return userService.getUser(id);
    }

    @PostMapping("/user")
    @ResponseBody
    public User createUser(@RequestBody User usuario){
        return userService.saveUser(usuario);
    }

    @PostMapping("/user/{id}")
    @ResponseBody
    public User updateUser(@RequestBody User usuario, @PathVariable("id") Long id) {
        return userService.updateUser(id, usuario);
    }

    @GetMapping("/user/{id}/deleteById")
    @ResponseBody
    public Boolean deleteUserById(@PathVariable("id") Long id) {
        return userService.deleteUserById(id);
    }

    @GetMapping("/user/{id}/delete")
    @ResponseBody
    public Boolean deleteUser(@PathVariable("id") Long id) {
        return userService.deleteUser(id);
    }

}
