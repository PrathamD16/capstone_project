package com.example.flight_service.repo;

import com.example.flight_service.model.AllFlightModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BackUpFlight extends JpaRepository<AllFlightModel, Long> {
}
