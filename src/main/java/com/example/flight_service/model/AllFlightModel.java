package com.example.flight_service.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.*;
@Entity
@Table(name = "backup_flight")
@Data
public class AllFlightModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private String name;
    private int cost;
    private int booked_seats;
    private int total_seats;
    private LocalDateTime dept_time;
    private String source;
    private String destination;
}
