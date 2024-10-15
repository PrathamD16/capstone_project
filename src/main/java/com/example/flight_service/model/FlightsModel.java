package com.example.flight_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "flights")
@AllArgsConstructor
@NoArgsConstructor
public class FlightsModel {
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

    public void setId(int id) {
        Id = id;
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public void setBooked_seats(int booked_seats) {
        this.booked_seats = booked_seats;
    }

    public void setTotal_seats(int total_seats) {
        this.total_seats = total_seats;
    }

    public void setDept_time(LocalDateTime dept_time) {
        this.dept_time = dept_time;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public int getId() {
        return Id;
    }

    public String getName() {
        return name;
    }

    public int getCost() {
        return cost;
    }

    public int getBooked_seats() {
        return booked_seats;
    }

    public int getTotal_seats() {
        return total_seats;
    }

    public LocalDateTime getDept_time() {
        return dept_time;
    }

    public String getSource() {
        return source;
    }

    public String getDestination() {
        return destination;
    }
}
