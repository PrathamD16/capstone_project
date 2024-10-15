package com.example.passengers.repo;

import com.example.passengers.model.FlightsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FlightRepo extends JpaRepository<FlightsModel, Long> {
    @Query(nativeQuery = true, value = "SELECT total_seats - booked_seats FROM flights WHERE Id = :id")
    Object avail_seats(long id);
}
