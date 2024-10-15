package com.example.passengers.controller;

import com.example.passengers.model.BookingsModel;
import com.example.passengers.model.FlightsModel;
import com.example.passengers.response.BookingResponse;
import com.example.passengers.service.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RestController
@CrossOrigin(value = "http://localhost:5173")
public class PassengerController {


    @Autowired
    PassengerService passengerService;

    @GetMapping("/test")
    public String test(){
        return "Hello From Controller";
    }

    @PostMapping("/bookCustomer")
    public ResponseEntity<String>bookPassenger(@RequestBody BookingsModel model){
        model.setStatus("confirmed");
        return ResponseEntity.status(HttpStatus.OK).body(passengerService.addBooking(model));
    }

    @DeleteMapping("/deleteBooking/{id}")
    public ResponseEntity<Boolean>deleteBooking(@PathVariable long id){
        boolean flag = passengerService.deleteBookingById(id);
        return ResponseEntity.status(HttpStatus.OK).body(flag);
    }

//    @GetMapping("/getAllBooking")
//    public ResponseEntity<List<BookingsModel>>getAllBooking(@RequestParam String email){
//        List<BookingsModel>res = passengerService.getAllBookings(email);
//        return ResponseEntity.status(HttpStatus.OK).body(res);
//    }

    @GetMapping("/getBookingByEmail")
    public ResponseEntity<List<BookingResponse>>getAllBooking(@RequestParam String email){
        List<BookingResponse>res = passengerService.getBooking(email);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}