package com.example.security.controller;

import com.example.security.model.User;
import com.example.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    @ResponseBody
    public ResponseEntity<?> getUsers() {
        return userService.allTheInformation(userService.getUsersDTO(userService.getUsers()));
    }

    @GetMapping("/user/{id}")
    @ResponseBody
    public ResponseEntity<?> getUser(@PathVariable("id") Long id) {
        return userService.getUserDTO(userService.getUser(id));
    }

    @GetMapping("/userEmail")
    @ResponseBody
    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping("/user")
    public ResponseEntity<?> createUser(@RequestParam String name, @RequestParam String lastName,
                                        @RequestParam String email, @RequestParam String password, @RequestParam Long role) {
        return userService.saveUser(name, lastName, email, password, role);
    }

    @PutMapping("/user/{id}") //cambiar por un put
    public ResponseEntity<?> updateUser(@RequestBody User usuario, @PathVariable("id") Long id) {
        return userService.updateUser(id, usuario);
    }

    /*@GetMapping("/user/{id}/deleteById")
    public ResponseEntity<?> deleteUserById(@PathVariable("id") Long id) {
        return userService.deleteUserById(id);
    }*/

    @PutMapping("/user/{id}/delete")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        return userService.deleteUser(id);
    }

    @DeleteMapping("/user/{id}/permanentDelete")
    public ResponseEntity<?> permanentDeleteUser(@PathVariable("id") Long id) {
        return userService.permanentDeleteUser(id);
    }

    @GetMapping("/employees")
    public ResponseEntity<?> getAllEmployeesActive() {
        return userService.getAllEmployeeActive();
    }

}
