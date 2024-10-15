package com.example.flight_service.data;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FlightUpdateRequest {
    private String source;
    private String destination;
    private LocalDateTime dept_time;
    private int cost;
    private String name;
    private int booked_seats;
    private int total_seats;

    public FlightUpdateRequest(){
        source = null;
        destination = null;
        dept_time = null;
        cost = -1;
        name = null;
        booked_seats = -1;
        total_seats = -1;
    }
}
