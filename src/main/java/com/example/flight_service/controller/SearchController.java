package com.example.flight_service.controller;

import java.util.*;

import com.example.flight_service.model.AllFlightModel;
import com.example.flight_service.model.FlightsModel;
import com.example.flight_service.service.FlightService;
import com.example.flight_service.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/search")
@CrossOrigin(value = "http://localhost:5173")
public class SearchController {
    @Autowired
    SearchService searchService;

    @Autowired
    FlightService flightService;

    @GetMapping("/test")
    public String test(){
        return "Test";
    }

    @GetMapping("/user")
    public ResponseEntity<List<FlightsModel>>getAllFlightsUser(@RequestParam String src, @RequestParam String des, @RequestParam String date){
        System.out.println(src);
        System.out.println(des);
        System.out.println(date);
        List<FlightsModel>res = searchService.userSearch(src, des, date);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

//    @GetMapping("/flight/{id}")
//    public FlightsModel getSingleFlight(@PathVariable long id){
//        return flightService.getSingleFlight(id);
//    }

    @GetMapping("/flight/{id}")
    public AllFlightModel getSingleFlight(@PathVariable long id){
        return flightService.getSingleFlight(id);
    }

    @GetMapping("/getsingleflight/{id}")
    public FlightsModel getSingleFlightForUpdate(@PathVariable long id){
        return flightService.getUpdateSingleFlight(id);
    }

//    @GetMapping("/admin")
//    public ResponseEntity<List<FlightsModel>>getAllFlightsAdmin(@RequestParam String src, @RequestParam String des){
//        List<FlightsModel>res = searchService.adminSearch(src, des);
//        return ResponseEntity.status(HttpStatus.OK).body(res);
//    }


}
