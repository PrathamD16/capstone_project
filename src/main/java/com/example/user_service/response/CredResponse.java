package com.example.user_service.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CredResponse {
    private String email;
    private String password;
}
