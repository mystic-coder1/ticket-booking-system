package org.example.ticketbookingwebapp.model;

public class Passenger
{
    private Integer id;

    private String name;

    private String departure;

    private String arrival;

    private String dateOfJourney;

    public Passenger(Integer id, String name, String departure, String arrival, String dateOfJourney) {
        this.id = id;
        this.name = name;
        this.departure = departure;
        this.arrival = arrival;
        this.dateOfJourney = dateOfJourney;
    }

    public Passenger() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getArrival() {
        return arrival;
    }

    public void setArrival(String arrival) {
        this.arrival = arrival;
    }

    public String getDateOfJourney() {
        return dateOfJourney;
    }

    public void setDateOfJourney(String dateOfJourney) {
        this.dateOfJourney = dateOfJourney;
    }

    @Override
    public String toString() {
        return "Passenger{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", departure='" + departure + '\'' +
                ", arrival='" + arrival + '\'' +
                ", dateOfJourney='" + dateOfJourney + '\'' +
                '}';
    }
}
