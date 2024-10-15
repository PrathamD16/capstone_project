package com.example.passengers.configuration;

import com.example.passengers.service.PassengerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;


@Configuration
public class PassengerConfig {
    @Value("${flightservice.base.url}")
    private String baseUrl;

    @Bean
    public PassengerService passengerService(){
        return new PassengerService();
    }

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }

    @Bean
    public WebClient webClient(){
        return WebClient.builder()
                .baseUrl(baseUrl)
                .build();
    }
}
