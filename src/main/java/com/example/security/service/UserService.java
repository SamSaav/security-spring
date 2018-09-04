package com.example.security.service;

import com.example.security.model.Person;
import com.example.security.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private PersonRepository personRepository;

    public List<Person> getUsers() {
        List<Person> lstPersons = personRepository.findAll();
        return lstPersons;
    }

    public Person getUser(Long id) {
        Person person = personRepository.getById(id);
        return person;
    }

    public Person findByEmail(String email, String password) {
        Person person = personRepository.findByEmail(email);
        if (email.isEmpty() && password.isEmpty()){
            return null;
        }else if (person == null){
            return null;
        }else if (person.getPassword() != password){
            return null;
        }else{
            return person;
        }
    }

}
