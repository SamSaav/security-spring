package com.example.security.service;

import com.example.security.model.Role;
import com.example.security.model.UrlMicroservicios;
import com.example.security.model.User;
import com.example.security.repositories.RoleRepository;
import com.example.security.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RestTemplate restTemplate;

    public List<User> getUsers() {

        if (getRole(isAuth()) == 1) {
            return userRepository.findAll();
        }
        return userRepository.findAll().stream().filter(u -> u.getActive() == true).collect(Collectors.toList());
    }

    public List<Object> getUsersDTO(List<User> users) {
        List<Object> lstUsers = users.stream().map(s -> s.userDTO()).collect(Collectors.toList());
        return lstUsers;
    }

    public ResponseEntity<?> allTheInformation(List<Object> users) {
        if (isAuth() == null) {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        } else {
            Object info = maps("users", users);
            return new ResponseEntity<>(info, HttpStatus.OK);
        }
    }

    public User getUser(Long id) {
        User user = userRepository.getById(id);
        return user;
    }

    public ResponseEntity<?> getUserDTO(User user) {
        if (isAuth() == null) {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        } else {
            return new ResponseEntity<>(user.userDTO(), HttpStatus.OK);
        }
    }

    public ResponseEntity<?> getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    public ResponseEntity<?> saveUser(String name, String lastName, String email, String password, Long role) {
        /*if (isAuth() == null){
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        } else if (getRole(isAuth()) == 1){*/
        if (name.isEmpty() || lastName.isEmpty() || email.isEmpty() || password.isEmpty() || role == null) {
            return new ResponseEntity<>("Sin contenido", HttpStatus.NO_CONTENT);
        }
        if (userRepository.findByEmail(email) != null) {
            return new ResponseEntity<>("Nombre en uso", HttpStatus.FORBIDDEN);
        }
        User user = new User(name, lastName, email, passwordEncoder.encode(password), roleRepository.getById(role));
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
        /*} else {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        }*/
    }

    public ResponseEntity<?> updateUser(Long id, User usuario) {
        if (isAuth() == null) {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        } else if (getRole(isAuth()) == 1) {
            if (id != null && usuario != null) {
                User user = userRepository.getById(id);
                userRepository.save(getDataUpdateUser(user, usuario));
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Sin contenido", HttpStatus.NO_CONTENT);
            }
        } else {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        }
    }

    public ResponseEntity<?> deleteUserById(Long id) {
        if (isAuth() == null) {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        } else if (getRole(isAuth()) == 1) {
            if (id != null) {
                User user = userRepository.findById(id).get();
                user.changeActive();
                userRepository.save(user);
                return new ResponseEntity<>(maps("Temporarily deleted", true), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(maps("Sin contenido", false), HttpStatus.NO_CONTENT);
            }
        } else {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        }

    }

    public ResponseEntity<?> deleteUser(Long id) {
        if (isAuth() == null) {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        } else if (getRole(isAuth()) == 1) {
            User user = userRepository.getById(id);
            if (id != null && user != null) {
                user.changeActive();
                userRepository.save(user);
                return new ResponseEntity<>(maps("Temporarily deleted", true), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(maps("Missing data", false), HttpStatus.NO_CONTENT);
            }
        } else {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }

    }

    public ResponseEntity<?> permanentDeleteUser(Long id) {
        if (isAuth() == null) {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        } else if (getRole(isAuth()) == 1) {
            User user = userRepository.getById(id);
            if (id != null && user != null) {
                userRepository.delete(user);
                return new ResponseEntity<>(maps("Eliminado", true), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(maps("Sin contenido", false), HttpStatus.NO_CONTENT);
            }
        } else {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        }

    }


    public ResponseEntity<?> getAllEmployees() {
        if (isAuth() == null) {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        } else {
            return new ResponseEntity<>(maps("employee", restTemplate.getForObject(UrlMicroservicios.MS_EMPLEADOS.toString(), Object.class)), HttpStatus.OK);
        }
    }

    public ResponseEntity<?> createEmployee(Object employee) {
        if (isAuth() == null) {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        } else if (getRole(isAuth()) == 1) {
            return new ResponseEntity<>(restTemplate.postForObject(UrlMicroservicios.MS_EMPLEADOS.toString(), employee, Object.class), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        }
    }

    public ResponseEntity<?> updateEmployee (Long id, Object employee) {
        if (isAuth() == null) {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        } else if (getRole(isAuth()) == 1) {
            String url = UrlMicroservicios.MS_EMPLEADOS_UPDATE.toString() + "/" + id;
            HttpEntity<Object> requestUpdate = new HttpEntity<>(employee);
            return new ResponseEntity<>(restTemplate.exchange(url, HttpMethod.PUT, requestUpdate, Void.class), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        }
    }

    public ResponseEntity<?> hideEmployee(Long id) {
        if (isAuth() == null) {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        } else if (getRole(isAuth()) == 1) {
            String url = UrlMicroservicios.MS_EMPLEADOS_DELETE.toString() + "/" + id;
            HttpEntity<?> requestDelete = new HttpEntity<>(id);
            return new ResponseEntity<>(restTemplate.exchange(url, HttpMethod.DELETE, requestDelete, Void.class), HttpStatus.OK);
        }else {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        }
    }

    public ResponseEntity<?> deleteEmployee(Long id) {
        if (isAuth() == null) {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        } else if (getRole(isAuth()) == 1) {
            String url = UrlMicroservicios.MS_EMPLEADOS_PERMANENT_DELETE.toString() + "/" + id;
            HttpEntity<?> requestDelete = new HttpEntity<>(id);
            return new ResponseEntity<>(restTemplate.exchange(url, HttpMethod.DELETE, requestDelete, Void.class), HttpStatus.OK);
        }else {
            return new ResponseEntity<>("No autorizado", HttpStatus.FORBIDDEN);
        }
    }

    public User getDataUpdateUser(User user, User usuario) {
        if (usuario.getName() != null && user.getName() != usuario.getName()) {
            user.setName(usuario.getName());
        }
        if (usuario.getLastName() != null && user.getLastName() != usuario.getLastName()) {
            user.setLastName(usuario.getLastName());
        }
        if (usuario.getEmail() != null && user.getEmail() != usuario.getEmail()) {
            user.setEmail(usuario.getEmail());
        }
        if (usuario.getPassword() != null && user.getPassword() != passwordEncoder.encode(usuario.getPassword())) {
            user.setPassword(passwordEncoder.encode(usuario.getPassword()));
        }
        if (usuario.getRole() != null && user.getRole() != usuario.getRole()) {
            user.setRole(usuario.getRole());
        }
        return user;
    }

    public Map<String, Object> maps(String var, Object some) {
        Map<String, Object> dto = new LinkedHashMap<>();
        dto.put(var, some);
        return dto;
    }

    private String isAuth() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken) {
            return null;
        } else {
            return authentication.getName();
        }
    }

    private Long getRole(String email) {
        User user = userRepository.findByEmail(email);
        Role role = user.getRole();
        return role.getId();
    }

}
