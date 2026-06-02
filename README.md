# Microservices Ticket Booking System

A full-stack, microservices-based ticket booking application built using Spring Boot, React, and MySQL. This project demonstrates a scalable and decoupled architecture with an API Gateway, Backend Microservice, and Frontend UI working together to provide a seamless ticket booking experience.

---

## 🏗️ Architecture Overview

The application follows a microservices architecture and is divided into three layers:


### Architecture Flow

```text
React Frontend (5173)
          │
          ▼
API Gateway (8081)
          │
          ▼
Booking Service (8080)
          │
          ▼
      MySQL Database
```

---

## 🚀 Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS3

### Backend

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate

### Database

* MySQL

### API Documentation

* OpenAPI / Swagger

---

## ⚙️ Port Configuration

| Service         | Port |
| --------------- | ---- |
| Frontend UI     | 5173 |
| API Gateway     | 8081 |
| Booking Service | 8080 |
| MySQL           | 3306 |

---

## 📁 Project Structure

```text
backend
├── TicketBookingGateway/       # API Gateway
├── TicketBookingService/       # Booking Microservice
```

---

## 🛠️ Prerequisites

Make sure the following software is installed:

* Java JDK 17+
* Maven
* Node.js & npm
* MySQL Server
* IntelliJ IDEA / Eclipse / VS Code

---

## 💻 Local Setup Instructions

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd ticket-booking
```

---

### Step 2: Configure MySQL Database

Create a database named:

```sql
CREATE DATABASE finishers;
```

Update the `application.properties` file inside the **TicketBookingService**:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/finishers
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

### Step 3: Start Backend Services

Run the following applications from your IDE:

#### Booking Service

```text
TicketBookingServiceApplication.java
```

Runs on:

```text
http://localhost:8080
```

#### API Gateway

```text
TicketBookingGatewayApplication.java
```

Runs on:

```text
http://localhost:8081
```

---

### Step 4: Start Frontend

Navigate to the frontend project directory:

```bash
cd TicketBookingFrontend
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 🔌 API Endpoints

### Register Passenger

```http
POST /api/register-passenger
```

#### Request Body

```json
{
  "id": "1001",
  "name": "Peter",
  "departure": "Delhi",
  "arrival": "Bengaluru",
  "dateOfJourney": "2026-06-01"
}
```

#### Response

```json
{
  "ticketNumber": 1001
}
```

---

### Get Ticket Details

```http
GET /api/get-ticket?ticketNumber={id}
```

#### Example

```http
GET /api/get-ticket?ticketNumber=1001
```

Returns complete journey and passenger information associated with the ticket.

---

## 📖 API Documentation

Swagger UI is available at:

```text
http://localhost:8080/swagger-ui/index.html
```

---

## ✨ Features

* Passenger Registration
* Ticket Generation
* Ticket Retrieval
* RESTful APIs
* Swagger Documentation
* API Gateway Routing
* Microservices-Based Architecture
* MySQL Persistence

---

## 🔮 Future Enhancements

* Spring Cloud Gateway Integration
* JWT Authentication & Authorization
* Spring Security Implementation
* RabbitMQ / Kafka Integration
* Email Ticket Notifications
* Docker Containerization
* CI/CD Pipeline
* Service Discovery using Eureka

---

## 📄 License

This project is developed for learning and portfolio purposes.
