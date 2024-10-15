package com.example.passengers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class PassengersApplication {

	public static void main(String[] args) {
		SpringApplication.run(PassengersApplication.class, args);
		System.out.println("Passenger Application started");
	}

}
