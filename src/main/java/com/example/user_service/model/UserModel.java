package com.example.user_service.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Data
@Table(name = "users")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long uid;
    @Column(unique = true)
    private String email;
    private String password;
    private String username;
    @Column(columnDefinition = "boolean default false")
    private boolean isAdmin;
}
