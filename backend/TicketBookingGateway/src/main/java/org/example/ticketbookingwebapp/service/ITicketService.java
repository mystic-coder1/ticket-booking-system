package org.example.ticketbookingwebapp.service;

import org.example.ticketbookingwebapp.model.Passenger;
import org.example.ticketbookingwebapp.model.Ticket;
import org.springframework.stereotype.Service;

@Service
public interface ITicketService
{
    public Integer registerPassenger(Passenger passenger);

    public Ticket getFullTicket(Integer ticketNumber);
}
