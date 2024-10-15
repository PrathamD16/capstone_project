package com.example.user_service.repo;
import java.util.*;
import com.example.user_service.model.UserModel;
import com.example.user_service.response.CredResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<UserModel, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM users WHERE email = :emid AND password = :password")
    UserModel authenticateUser(String emid, String password);
//    @Query(nativeQuery = true, value = "SELECT email FROM users WHERE password = :password")
//    String getPassword(String password);
}
