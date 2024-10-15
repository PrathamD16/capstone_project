package com.example.passengers.repo;

import com.example.passengers.model.BookingsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import org.springframework.web.bind.annotation.ResponseBody;

public interface BookingRepo extends JpaRepository<BookingsModel, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM bookings WHERE by_email = :email")
    List<BookingsModel>getAllPassenger(String email);
}
