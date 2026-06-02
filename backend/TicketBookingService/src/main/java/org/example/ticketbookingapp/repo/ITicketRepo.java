package org.example.ticketbookingapp.repo;

import org.example.ticketbookingapp.model.Passenger;
import org.example.ticketbookingapp.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITicketRepo extends JpaRepository<Passenger, Integer>
{

}

