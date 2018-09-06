package com.example.security.controller;

import com.example.security.model.User;
import com.example.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    @ResponseBody
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/user/{id}")
    @ResponseBody
    public User getUser(@PathVariable("id") Long id) {
        return userService.getUser(id);
    }

    @PostMapping("/user")
    public ResponseEntity<?> createUser(@RequestParam String name, @RequestParam String lastName,
                                             @RequestParam String email, @RequestParam String password, @RequestParam Long role){
        return userService.saveUser(name, lastName, email, password, role);
    }

    @PostMapping("/user/{id}")
    @ResponseBody
    public ResponseEntity<?> updateUser(@RequestBody User usuario, @PathVariable("id") Long id) {
        return userService.updateUser(id, usuario);
    }

    @GetMapping("/user/{id}/deleteById")
    @ResponseBody
    public ResponseEntity<?> deleteUserById(@PathVariable("id") Long id) {
        return userService.deleteUserById(id);
    }

    @GetMapping("/user/{id}/delete")
    @ResponseBody
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        return userService.deleteUser(id);
    }

}
