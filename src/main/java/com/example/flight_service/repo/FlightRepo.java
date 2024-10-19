package com.example.flight_service.repo;

import com.example.flight_service.model.FlightsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface FlightRepo extends JpaRepository<FlightsModel, Long> {
//    For admin search
//    For Mirco-service
    @Query(nativeQuery = true, value = "SELECT * FROM flights WHERE (source LIKE CONCAT(:src, '%') AND destination LIKE CONCAT(:des, '%')) AND DATE(dept_time) = :date")
    List<FlightsModel>searchFlightAdmin(String src, String des, String date);
//    For use search
//    For Micro-service
    @Query(nativeQuery = true, value = "SELECT * FROM flights WHERE (source LIKE CONCAT(:src, '%') AND destination LIKE CONCAT(:des, '%')) AND DATE(dept_time) = :date")
    List<FlightsModel>searchFlightUser(String src, String des, String date);

    @Query(nativeQuery = true, value = "SELECT * FROM flights ORDER BY cost ASC")
    List<FlightsModel>sortbyFlightsCost();

}
