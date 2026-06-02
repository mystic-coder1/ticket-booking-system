package org.example.ticketbookingwebapp.web;

import org.example.ticketbookingwebapp.model.Passenger;
import org.example.ticketbookingwebapp.model.Ticket;
import org.example.ticketbookingwebapp.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController
{
    @Autowired()
    private TicketService service;

    @PostMapping("/passenger-form")
    public String passengerForm(Passenger passenger, Model model)
    {
        Integer ticketNumber = service.registerPassenger(passenger);
        model.addAttribute("ticketNumber", ticketNumber);
        return null;
    }

    @GetMapping("/ticket-form")
    public String ticketForm(Passenger passenger, Model model)
    {
        model.addAttribute("passenger", new Passenger());
        return "ticketForm";
    }

    @GetMapping("/get-ticket")
    public String getTicket(@RequestParam("ticketNumber") Integer ticketNumber, Model model)
    {
        Ticket ticket = service.getFullTicket(ticketNumber);
        model.addAttribute("ticket", ticket);
        return "ticketInfo";
    }
}
