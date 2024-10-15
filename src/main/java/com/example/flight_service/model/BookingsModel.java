package com.example.flight_service.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "bookings")
@Data
public class BookingsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bid;
    private String cname;
    private String contact;
    private int age;
    private String gender;
    private String by_email;
    private String status;
    private int fid;

//    @ManyToOne // This is a ManyToOne relationship with Flights
//    @JoinColumn(name = "fid", referencedColumnName = "Id")
//    private FlightsModel flights; // Renamed for clarity
}