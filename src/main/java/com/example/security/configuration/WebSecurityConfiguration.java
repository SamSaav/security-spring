package com.example.security.configuration;

import com.example.security.model.Person;
import com.example.security.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
public class WebSecurityConfiguration extends GlobalAuthenticationConfigurerAdapter {

    @Autowired
    private PersonRepository personRepository;

    @Override
    public void init(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(inputName -> {
            Person person = personRepository.findByEmail(inputName);
            String role = person.getRole().getRole();
            if (person != null) {
                return new User(person.getEmail(), person.getPassword(), AuthorityUtils.createAuthorityList(role.toUpperCase()));
            }else{
                throw new UsernameNotFoundException("Unknown user: " + inputName);
            }
        });
    }

}
