package com.example.security.controller;

import com.example.security.model.User;
import com.example.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/veedor/users")
    public ResponseEntity<?> getUsers() {
        return userService.allTheInformation(userService.getUsersDTO(userService.getUsers()));
    }

    @GetMapping("/veedor/{id}")
    public ResponseEntity<?> getUser(@PathVariable("id") Long id) {
        return userService.getUserDTO(userService.getUser(id));
    }

    @GetMapping("/userEmail")
    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping("/admin/create")
    public ResponseEntity<?> createUser(@RequestParam String name, @RequestParam String lastName,
                                        @RequestParam String email, @RequestParam String password, @RequestParam Long role) {
        return userService.saveUser(name, lastName, email, password, role);
    }

    @PutMapping("/admin/update/{id}") //cambiar por un put
    public ResponseEntity<?> updateUser(@RequestBody User usuario, @PathVariable("id") Long id) {
        return userService.updateUser(id, usuario);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        return userService.deleteUser(id);
    }

    @DeleteMapping("/admin/permanentDelete/{id}")
    public ResponseEntity<?> permanentDeleteUser(@PathVariable("id") Long id) {
        return userService.permanentDeleteUser(id);
    }
    @GetMapping("/admin/employees")
    public ResponseEntity<?> getAllEmployees() {
        return userService.getAllEmployees();
    }

    @PostMapping("/admin/createEmployee")
    public ResponseEntity<?> createEmployee(@RequestBody Object employee) {
        return userService.createEmployee(employee);
    }

    @PutMapping("/admin/updateEmployee/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable("id") Long id, @RequestBody Object employee) {
        return userService.updateEmployee(id, employee);
    }

    @DeleteMapping("/deleteEmployee/{id}")
    public ResponseEntity<?> deleteUpdate(@PathVariable("id") Long id) {
        return userService.hideEmployee(id);
    }

    @DeleteMapping("/admin/permanentDelete/{id}")
    public ResponseEntity<?> permanentDelete(@PathVariable("id") Long id) {
        return userService.deleteEmployee(id);
    }

}
