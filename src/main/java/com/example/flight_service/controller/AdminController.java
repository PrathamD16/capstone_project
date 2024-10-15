package com.example.flight_service.controller;


import com.example.flight_service.data.FlightUpdateRequest;
import com.example.flight_service.model.FlightsModel;
import com.example.flight_service.service.FlightService;
import com.example.flight_service.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(value = "http://localhost:5173")
public class AdminController {
    @Autowired
    FlightService flightService;

    @Autowired
    SearchService searchService;

    @PostMapping("/addFlights")
    public ResponseEntity<FlightsModel> addFlights(@RequestBody FlightsModel new_flight){
        return ResponseEntity.status(HttpStatus.OK).body(flightService.addFlight(new_flight));
    }

    @DeleteMapping("/deleteMapping/{id}")
    public ResponseEntity<Boolean>deleteFlight(@PathVariable long id){
        return ResponseEntity.status(HttpStatus.OK).body(flightService.deleteFlightById(id));
    }

    @PatchMapping("/updateFlight/{id}")
    public ResponseEntity<FlightsModel>updateFlight(@PathVariable long id, @RequestBody FlightUpdateRequest req){
        return ResponseEntity.status(HttpStatus.OK).body(flightService.updateById(id,req));
    }

    @GetMapping("/getAllFlights")
    public ResponseEntity<List<FlightsModel>>getAllFlights(@RequestParam String src, @RequestParam String des ,@RequestParam String date){
        return ResponseEntity.status(HttpStatus.OK).body(searchService.adminSearch(src, des, date));
    }

}
