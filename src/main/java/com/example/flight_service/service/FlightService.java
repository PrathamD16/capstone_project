package com.example.flight_service.service;

import com.example.flight_service.model.AllFlightModel;
import com.example.flight_service.model.BookingsModel;
import com.example.flight_service.model.FlightsModel;
import com.example.flight_service.data.FlightUpdateRequest;
import com.example.flight_service.repo.BackUpFlight;
import com.example.flight_service.repo.BookingRepo;
import com.example.flight_service.repo.FlightRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FlightService {
    @Autowired
    FlightRepo flightRepo;

    @Autowired
    BackUpFlight backUpFlight;

    @Autowired
    BookingRepo bookingRepo;

    public FlightsModel addFlight(FlightsModel model){
        AllFlightModel o1 = new AllFlightModel();
        setObject(model, o1);
        backUpFlight.save(o1);
        return flightRepo.save(model);
    }

    public boolean deleteFlightById(long id){
        try {
            flightRepo.deleteById(id);
            List<BookingsModel>bookings = bookingRepo.findAll();
            for(BookingsModel x: bookings){
                setStatus(x);
            }
        }catch (Exception e){

            return false;
        }
        return true;
    }

//    For update functionality, refering to main table
    public FlightsModel getUpdateSingleFlight(long id){
        Optional<FlightsModel>temp = flightRepo.findById(id);
        if(temp.isPresent()){
            return temp.get();
        }
        return null;
    }

    public FlightsModel updateById(long id, FlightUpdateRequest req){
        Optional<FlightsModel> flight = flightRepo.findById(id);
        Optional<AllFlightModel>temp = backUpFlight.findById(id);
        if(flight.isEmpty()){
            return null;
        }
        LocalDateTime new_time = req.getDept_time();
        String destination = req.getDestination();
        String source = req.getSource();
        String name = req.getName();
        int booked_seats = req.getBooked_seats();
        int total_seats = req.getTotal_seats();
        int cost = req.getCost();
        if(new_time != null){
            flight.get().setDept_time(new_time);
            temp.get().setDept_time(new_time);
        }
        if(destination != null){
            flight.get().setDestination(destination);
            temp.get().setDestination(destination);
        }
        if(source != null){
            flight.get().setSource(source);
            temp.get().setSource(source);
        }
        if(cost != -1){
            flight.get().setCost(cost);
            temp.get().setCost(cost);
        }
        if(name != null){
            flight.get().setName(name);
            temp.get().setName(name);
        }
        if(booked_seats != -1){
            flight.get().setBooked_seats(booked_seats);
            temp.get().setBooked_seats(booked_seats);
        }
        if(total_seats != -1){
            flight.get().setTotal_seats(total_seats);
            temp.get().setTotal_seats(total_seats);
        }
        FlightsModel updatedFlight = flightRepo.save(flight.get());
        backUpFlight.save(temp.get());
        return updatedFlight;
    }

//    For Microservice
//    public FlightsModel getSingleFlight(long id){
//        Optional<FlightsModel>res = flightRepo.findById(id);
//        if(res.isPresent()){
//            return res.get();
//        }
//        return null;
//    }

    public AllFlightModel getSingleFlight(long id){
        Optional<AllFlightModel>res = backUpFlight.findById(id);
        if(res.isPresent()){
            return res.get();
        }
        return null;
    }

    public FlightsModel getSingleFlightForBooking(long id){
        Optional<FlightsModel>res = flightRepo.findById(id);
        if(res.isPresent()){
            return res.get();
        }
        return null;
    }

    public int costOfFlight(long id){
        Optional<FlightsModel>res = flightRepo.findById(id);
        if(res.isPresent()){
            return res.get().getCost();
        }
        return -1;
    }

    public List<FlightsModel> getAllFlights(){
        return flightRepo.findAll();
    }

    public void setObject(FlightsModel o1, AllFlightModel o2){
        o2.setId(o1.getId());
        o2.setDestination(o1.getDestination());
        o2.setSource(o1.getSource());
        o2.setCost(o1.getCost());
        o2.setName(o1.getName());
        o2.setBooked_seats(o1.getBooked_seats());
        o2.setTotal_seats(o1.getTotal_seats());
        o2.setDept_time(o1.getDept_time());
    }

    public void setStatus(BookingsModel obj){
        Optional<BookingsModel>temp = bookingRepo.findById(obj.getBid());
        temp.get().setStatus("cancelled");
        bookingRepo.save(temp.get());
    }

    public List<FlightsModel>getFlightsByCost(){
        return flightRepo.sortbyFlightsCost();
    }


}


