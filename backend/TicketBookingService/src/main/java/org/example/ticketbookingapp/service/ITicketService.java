package org.example.ticketbookingapp.service;

import org.example.ticketbookingapp.model.Passenger;
import org.hibernate.boot.model.source.internal.hbm.AbstractPluralAssociationElementSourceImpl;
import org.springframework.stereotype.Service;

public interface ITicketService
{
    Passenger registerPassenger(Passenger passenger);

    Passenger fetchPassengerInfo(Integer id);
}

