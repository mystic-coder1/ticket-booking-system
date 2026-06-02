package org.example.ticketbookingwebapp.service;

import org.example.ticketbookingwebapp.model.Passenger;
import org.example.ticketbookingwebapp.model.Ticket;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class TicketService implements ITicketService {

    // Override in application.properties: ticketservice.base-url=http://localhost:8080
    @Value("${ticketservice.base-url:http://localhost:8080}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public Integer registerPassenger(Passenger passenger) {
        String url = baseUrl + "/api/register-passenger";
        ResponseEntity<Integer> response = restTemplate.postForEntity(url, passenger, Integer.class);
        return response.getBody();
    }

    @Override
    public Ticket getFullTicket(Integer ticketNumber) {
        String url = baseUrl + "/api/get-ticket/" + ticketNumber;
        try {
            ResponseEntity<Ticket> response = restTemplate.getForEntity(url, Ticket.class);
            return response.getBody();
        } catch (HttpClientErrorException.NotFound e) {
            return null;  // Caller (controller) should handle null → 404 page
        }
    }
}