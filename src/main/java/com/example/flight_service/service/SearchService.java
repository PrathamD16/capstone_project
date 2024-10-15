package com.example.flight_service.service;

import java.util.*;

import com.example.flight_service.model.FlightsModel;
import com.example.flight_service.repo.FlightRepo;
import org.springframework.beans.factory.annotation.Autowired;

public class SearchService {
    @Autowired
    FlightRepo flightRepo;

    public List<FlightsModel>userSearch(String source, String destination, String date){
        List<FlightsModel>res = flightRepo.searchFlightUser(source, destination, date);
        return res;
    }

    public List<FlightsModel>adminSearch(String source, String destination, String date){
        List<FlightsModel>res = flightRepo.searchFlightAdmin(source, destination, date);
        return res;
    }
}
