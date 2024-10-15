package com.example.flight_service.configuration;

import com.example.flight_service.service.FlightService;
import com.example.flight_service.service.SearchService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class flight_service_config {
    @Bean
    public FlightService flightService(){
        return new FlightService();
    }
    @Bean
    public SearchService searchService(){
        return new SearchService();
    }
}
