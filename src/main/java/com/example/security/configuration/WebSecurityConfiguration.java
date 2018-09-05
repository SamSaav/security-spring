package com.example.security.configuration;

import com.example.security.model.User;
import com.example.security.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
public class WebSecurityConfiguration extends GlobalAuthenticationConfigurerAdapter {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void init(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(inputName -> {
            User user = userRepository.findByEmail(inputName);
            String role = user.getRole().getRole();
            if (user != null) {
                return new org.springframework.security.core.userdetails.User
                        (user.getEmail(), user.getPassword(), AuthorityUtils.createAuthorityList(role.toUpperCase()));
            }else{
                throw new UsernameNotFoundException("Unknown user: " + inputName);
            }
        });
    }

}
