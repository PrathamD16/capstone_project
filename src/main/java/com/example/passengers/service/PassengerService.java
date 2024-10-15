package com.example.passengers.service;

import com.example.passengers.model.AllFlightModel;
import com.example.passengers.model.BookingsModel;
import com.example.passengers.model.FlightsModel;
import com.example.passengers.repo.BookingRepo;
import com.example.passengers.repo.FlightRepo;
import com.example.passengers.response.BookingResponse;
import com.sun.jdi.LongValue;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.swing.text.html.Option;
import java.awt.print.Book;
import java.sql.Date;
import java.util.*;
import java.util.List;
import java.util.Optional;

@Service
public class PassengerService {

    @Autowired
    BookingRepo bookingRepo;
    @Autowired
    FlightRepo flightRepo;
    @Autowired
    ModelMapper modelMapper;

    @Autowired
    WebClient webClient;


    public String addBooking(BookingsModel model){
//        Optional<FlightsModel> obj = flightRepo.findById(Long.valueOf(model.getFlights().getId()));
        Optional<FlightsModel> obj = flightRepo.findById(Long.valueOf(model.getFid()));
        if(obj.isPresent()){
            obj.get().setBooked_seats(obj.get().getBooked_seats() + 1);
            flightRepo.save(obj.get());
            bookingRepo.save(model);
            return "Seat booked!!";
        }
        return "No seats available";
    }

    public boolean deleteBookingById(long id){
        Optional<BookingsModel>obj = bookingRepo.findById(id);
        if(obj.isPresent()){
//            Optional<FlightsModel>fl = flightRepo.findById(Long.valueOf(obj.get().getFlights().getId()));
//            fl.get().setBooked_seats(fl.get().getBooked_seats()-1);
//            Optional<FlightsModel>fl = flightRepo.findById(Long.valueOf(obj.get().getFid()));
            Optional<FlightsModel>fl = flightRepo.findById(Long.valueOf(obj.get().getFid()));
            if(fl.isPresent()){
                fl.get().setBooked_seats(fl.get().getBooked_seats() - 1);
                flightRepo.save(fl.get());
            }
            bookingRepo.deleteById(id);
            return true;
        }
        return false;
    }

//    public List<BookingsModel>getAllBookings(String email){
//        List<BookingsModel>temp = bookingRepo.getAllPassenger(email);
//        return temp;
//    }

//    public FlightsModel getFlight(long id){
//        FlightsModel res = webClient.get()
//                .uri("http://localhost:5000/flight-service/api/admin/getflightinfo" + id)
//                .retrieve()
//                .bodyToMono(FlightsModel.class)
//                .block();
//        return res;
//    }

    public List<BookingResponse> getBooking(String email){
        List<BookingResponse>res = new ArrayList<>();
        List<BookingsModel>bookTemp = bookingRepo.getAllPassenger(email);
        for(BookingsModel x: bookTemp){
            BookingResponse obj = new BookingResponse();
            obj.setBookingId((int)x.getBid());
//            obj.setFlightId(x.getFlights().getId());
            obj.setFlightId(x.getFid());

            obj.setCname(x.getCname());
            obj.setContact(x.getContact());
            obj.setGender(x.getGender());
            obj.setStatus(x.getStatus());
//            obj.setCost(x.getCost());
            AllFlightModel fmodel = getSingleFlight(obj.getFlightId());
            if(fmodel != null){
                obj.setSource(fmodel.getSource());
                obj.setDestination(fmodel.getDestination());
                obj.setName(fmodel.getName());
                obj.setDept_time(fmodel.getDept_time());
                obj.setCost(fmodel.getCost());
            }
            res.add(obj);
        }
        return res;
    }

//    ****
//    public FlightsModel getSingleFlight(long id){
//        FlightsModel res = webClient.get()
//                .uri("search/flight/" + id)
//                .retrieve()
//                .bodyToMono(FlightsModel.class)
//                .block();
//        return res;
//    }

    public AllFlightModel getSingleFlight(long id){
        AllFlightModel res = webClient.get()
                .uri("search/flight/" + id)
                .retrieve()
                .bodyToMono(AllFlightModel.class)
                .block();
        return res;
    }

}
