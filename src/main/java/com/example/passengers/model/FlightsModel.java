package com.example.passengers.model;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.Reference;

import java.awt.print.Book;
import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "flights")
@NoArgsConstructor
@AllArgsConstructor
@Data
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

//    @OneToMany(mappedBy = "flights", cascade = CascadeType.ALL)
//    private List<BookingsModel> bookings; // Renamed to plural for consistency
}
