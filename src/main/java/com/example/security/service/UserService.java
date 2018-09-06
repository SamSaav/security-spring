package com.example.security.service;

import com.example.security.model.Role;
import com.example.security.model.User;
import com.example.security.repositories.RoleRepository;
import com.example.security.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getUsers() {
        List<User> lstUsers = userRepository.findAll();
        return lstUsers;
    }

    public User getUser(Long id) {
        User user = userRepository.getById(id);
        return user;
    }

    public ResponseEntity<?> saveUser(String name, String lastName, String email, String password, Long role){
        /*if (name.isEmpty() || lastName.isEmpty() || email.isEmpty() || password.isEmpty() || role != null){
            return new ResponseEntity<>("Missing data", HttpStatus.NO_CONTENT);
        }
        if (userRepository.findByEmail(email) != null) {
            return new ResponseEntity<>("Name already in use", HttpStatus.FORBIDDEN);
        }*/
        User user = new User(name, lastName, email, passwordEncoder.encode(password), roleRepository.getById(role));
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateUser(Long id, User usuario){
        if (id != null && usuario != null){
            User user = userRepository.getById(id);
            userRepository.save(getDataUpdateUser(user, usuario));
            return new ResponseEntity<>(HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Missing data", HttpStatus.NO_CONTENT);
        }
    }

    public ResponseEntity<?> deleteUserById(Long id) {
        if (id != null){
            userRepository.deleteById(id);
            return new ResponseEntity<>(maps("Deleted", true), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(maps("Missing data", false), HttpStatus.NO_CONTENT);
        }

    }

    public ResponseEntity<?> deleteUser(Long id) {
        User user = userRepository.getById(id);
        if (id != null && user != null) {
            userRepository.delete(user);
            return new ResponseEntity<>(maps("Deleted", true), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(maps("Missing data", false), HttpStatus.NO_CONTENT);
        }

    }

    public User getDataUpdateUser(User user, User usuario){
        if (usuario.getName() != null && user.getName() != usuario.getName()) {
            user.setName(usuario.getName());
        }
        if (usuario.getLastName() != null && user.getLastName() != usuario.getLastName()) {
            user.setLastName(usuario.getLastName());
        }
        if (usuario.getEmail() != null && user.getEmail() != usuario.getEmail()) {
            user.setEmail(usuario.getEmail());
        }
        if (usuario.getPassword() != null && passwordEncoder.encode(user.getPassword() ) != passwordEncoder.encode(usuario.getPassword())) {
            user.setPassword(passwordEncoder.encode(usuario.getPassword()));
        }
        if (usuario.getRole() != null && user.getRole() != usuario.getRole()) {
            user.setRole(usuario.getRole());
        }
        return user;
    }

    public Map<String, Object> maps(String var, Object some){
        Map<String, Object> dto = new LinkedHashMap<>();
        dto.put(var, some);
        return dto;
    }

}
