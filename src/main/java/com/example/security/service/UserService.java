package com.example.security.service;

import com.example.security.model.User;
import com.example.security.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getUsers() {
        List<User> lstUsers = userRepository.findAll();
        return lstUsers;
    }

    public User getUser(Long id) {
        User user = userRepository.getById(id);
        return user;
    }

    public User saveUser(User user){
        userRepository.save(user);
        return user;
    }

    public User updateUser(Long id, User usuario){
        if (id != null && usuario != null){
            User user = userRepository.getById(id);
            return userRepository.save(getDataUpdateUser(user, usuario));
        }else{
            return null;
        }
    }

    public boolean deleteUserById(Long id) {
        if (id != null){
            userRepository.deleteById(id);
            return true;
        } else {
            return false;
        }

    }

    public boolean deleteUser(Long id) {
        User user = userRepository.getById(id);
        if (id != null && user != null) {
            userRepository.delete(user);
            return true;
        } else {
            return false;
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
        if (usuario.getPassword() != null && user.getPassword() != usuario.getPassword()) {
            user.setPassword(usuario.getPassword());
        }
        if (usuario.getRole() != null && user.getRole() != usuario.getRole()) {
            user.setRole(usuario.getRole());
        }
        return user;
    }

}
