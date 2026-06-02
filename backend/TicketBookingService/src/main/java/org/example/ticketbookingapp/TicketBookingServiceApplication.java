package org.example.ticketbookingapp;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
        info=@Info(
                title = "Ticket Booking Application",
                version = "1.0.0",
                description = "This is ticket booking platform where a user generate ticket and can check the status."
        ),

        servers=@Server(
                url="http://localhost/8080/TicketBookingApp",
                description = "This Application is using MySQL database."

        )
)
public class TicketBookingServiceApplication {

    public static void main(String[] args)
    {
        SpringApplication.run(TicketBookingServiceApplication.class, args);
    }

}
