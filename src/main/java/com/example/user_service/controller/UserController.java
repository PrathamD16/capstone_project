package com.example.user_service.controller;

import com.example.user_service.model.UserModel;
import com.example.user_service.response.CredResponse;
import com.example.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authenticate-auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/")
    public String test(){
        return "Hello from user-service server";
    }

    @PostMapping("/addUser")
    public ResponseEntity<Boolean>addNewUser(@RequestBody UserModel newUser){
        boolean res =  userService.addNewUser(newUser);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }


    @PostMapping("/authenticate")
    public ResponseEntity<UserModel>authenticateUser(@RequestBody CredResponse obj){
        UserModel res = userService.authenticateUser(obj);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

}
