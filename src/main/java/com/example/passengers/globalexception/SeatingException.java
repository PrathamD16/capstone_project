package com.example.passengers.globalexception;

public class SeatingException extends RuntimeException{
    public SeatingException(String message){
        super(message);
    }
}
