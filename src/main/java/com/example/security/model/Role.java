package com.example.security.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ROL_ID")
    private long id;

    @Column(name = "ROL_NAME")
    private String role;

    @OneToMany(mappedBy = "role", fetch = FetchType.EAGER)
    private Set<User> users;

    public Role(){}

    public Role(String role, Set<User> users) {
        this.role = role;
        this.users = users;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @JsonIgnore
    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
