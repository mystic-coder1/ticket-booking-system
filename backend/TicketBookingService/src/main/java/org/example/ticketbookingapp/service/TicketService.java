package org.example.ticketbookingapp.service;

import org.example.ticketbookingapp.model.Passenger;
import org.example.ticketbookingapp.repo.ITicketRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TicketService implements ITicketService
{
    @Autowired
    private ITicketRepo repo;

    @Override
    public Passenger registerPassenger(Passenger passenger) {
        return repo.save(passenger);
    }

    @Override
    public Passenger fetchPassengerInfo(Integer id) {
        Optional<Passenger> optional = repo.findById(id);
        if (optional.isPresent()) {
            return optional.get();
        }
        return null;
    }

}
