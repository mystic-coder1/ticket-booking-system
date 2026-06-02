package org.example.ticketbookingapp.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.ticketbookingapp.model.Passenger;
import org.example.ticketbookingapp.model.Ticket;
import org.example.ticketbookingapp.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "*")
@Tag(name = "Controller", description = "This Controller have 2 methods in which one is GET and other one is POST")
public class TicketController
{
    @Autowired
    private TicketService service;


    @PostMapping("register-passenger")
    @Operation(
            summary = "Register The User",
            description = "This is a Post methods that requires passenger info"
    )
    public ResponseEntity<Integer> registerPassenger(@RequestBody Passenger passenger) {
        Passenger pass = service.registerPassenger(passenger);
        Integer ticketNumber = pass.getId();
        return new ResponseEntity<>(ticketNumber, HttpStatus.OK);
    }

    @GetMapping("/get-ticket")
    @Operation(
            summary = "Get the generated ticket",
            description = "This is a Get methods that will generate the ticket with the given ticketNumber"
    )
    public ResponseEntity<Ticket> getTicket(@RequestParam("ticketNumber") Integer ticketNumber) {
        Passenger passenger = service.fetchPassengerInfo(ticketNumber);
        Ticket ticket = new Ticket();
        ticket.setTicketNumber(ticketNumber);
        ticket.setName(passenger.getName());
        ticket.setDeparture(passenger.getDeparture());
        ticket.setArrival(passenger.getArrival());
        ticket.setDateOfJourney(passenger.getDateOfJourney());
        ticket.setStatus("Confirmed");
        ticket.setTicketPrice(5893.25);

        return new ResponseEntity<>(ticket, HttpStatus.OK);
    }




}

