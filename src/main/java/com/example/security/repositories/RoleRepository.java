package com.example.security.repositories;

import com.example.security.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByRole(@Param("role") String role);
    Role getById(Long id);

}
