package com.example.user_service.service;
import java.util.*;
import com.example.user_service.model.UserModel;
import com.example.user_service.repo.UserRepo;
import com.example.user_service.response.CredResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    public boolean addNewUser(UserModel user){
        try {
            userRepo.save(user);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    public UserModel authenticateUser(CredResponse obj){
        UserModel res = userRepo.authenticateUser(obj.getEmail(), obj.getPassword());
        return res;
    }
}
