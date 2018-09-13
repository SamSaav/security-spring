package com.example.security.model;

import javax.persistence.*;
import java.util.LinkedHashMap;
import java.util.Map;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "USR_ID")
    private long id;

    @Column(name = "USR_FNAME")
    private String name;
    @Column(name = "USR_LNAME")
    private String lastName;
    @Column(name = "USR_EMAIL")
    private String email;
    @Column(name = "USR_PASSWD")
    private String password;

    @Column(name = "USR_ACTIVE")
    private Boolean active;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "USR_ROLE")
    private Role role;

    public User() {
    }

    public User(String name, String lastName, String email, String password, Role role) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.active = true;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public void changeActive() {
        if (this.active == true) {
            this.active = false;
        } else this.active = true;

    }

    public Map<String, Object> userDTO() {
        Map<String, Object> dto = new LinkedHashMap<>();
        dto.put("id", this.id);
        dto.put("name", this.name);
        dto.put("lastName", this.lastName);
        dto.put("email", this.email);
        dto.put("password", this.password);
        dto.put("role", this.role);
        dto.put("active", this.active);
        return dto;
    }
}
