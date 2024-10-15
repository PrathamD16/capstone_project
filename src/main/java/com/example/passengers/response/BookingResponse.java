package com.example.passengers.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDateTime;

@Data
public class BookingResponse {
    private int bookingId;
    private int flightId;
    private String cname;
    private String contact;
    private String gender;
    private String status;
    private int cost;
    private String source;
    private String destination;
    private String name;
    private LocalDateTime dept_time;
}
