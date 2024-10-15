package com.example.flight_service.repo;

import com.example.flight_service.model.BookingsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookingRepo extends JpaRepository<BookingsModel, Long> {
    @Query(nativeQuery = true, value = "UPDATE bookings SET status = `cancelled` WHERE fid = :id")
    void updateBookingTable(long id);
}
