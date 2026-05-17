# Database Design

## 1. Introduction

This document describes the **actual database design** implemented for the Bookify Event Booking System, based on the Prisma schema in the repository (`backend/prisma/schema.prisma`).

The database is responsible for storing and managing:

- User accounts

- Event information

- Booking records

The system uses a **relational SQL database** (PostgreSQL) to ensure data integrity, efficient querying, and strong relationships.

## 2. Database Objectives

The database was designed to:

- Store user and event data securely

- Manage event bookings with real-time seat availability

- Support both registered users and guest bookings

- Maintain referential integrity between users, events, and bookings

- Enable efficient data retrieval and updates

## 3. Technology Stack

| Component | Technology |
| - | - |
| Database Type | Relational |
| Database | PostgreSQL |
| ORM | Prisma |
| Query Language | SQL (via Prisma) |


## 4. Core Entities

The database currently contains **three primary entities**:

- **Users**

- **Events**

- **Bookings**

> **Note:** There is no separate **Tickets** table. Ticket logic is currently simplified within the Events model.

## 5. Entity Descriptions

### 5.1 Users Table

Stores information about registered users.

| Field Name | Data Type | Description | Constraints |
| - | - | - | - |
| id | Int | Unique user identifier | Primary Key, Auto-increment |
| name | String | User's full name | Required |
| email | String | User email address | Unique, Required |
| password | String | Hashed password | Required |
| createdAt | DateTime | Account creation timestamp | Default: now() |


### 5.2 Events Table

Stores details of events created by admins/organizers.

| Field Name | Data Type | Description | Constraints |
| - | - | - | - |
| id | Int | Unique event identifier | PK, Auto-increment |
| title | String | Event title | Required |
| description | String | Event description | Required |
| date | String | Event date and time | Required |
| location | String | Event location | Required |
| totalSeats | Int | Total seats available initially | Required |
| availableSeats | Int | Currently available seats | Required |
| price | Float | Ticket price per seat | Required |
| createdAt | DateTime | Event creation timestamp | Default: now() |


### 5.3 Bookings Table

Stores records of bookings made by users (registered or guests).

| Field Name | Data Type | Description | Constraints |
| - | - | - | - |
| id | Int | Unique booking identifier | PK, Auto-increment |
| name | String | Booker's name | Required |
| email | String | Booker's email | Required |
| seats | Int | Number of seats/tickets booked | Required |
| userId | Int? | Reference to registered user | Foreign Key (nullable) |
| eventId | Int | Reference to the event | Foreign Key (Required) |
| createdAt | DateTime | Booking creation timestamp | Default: now() |


## 6. Entity Relationships

- **One-to-Many**: One User can have multiple Bookings (optional — supports guest booking)

- **One-to-Many**: One Event can have multiple Bookings

- Each Booking belongs to **one Event** and optionally **one User**

### Relationship Overview

Users \> Bookings \< Events


## 7. Primary Keys & Foreign Keys

### Primary Keys

- User.id 

- Event.id 

- Booking.id 

### Foreign Keys

| **Table** | **Foreign Key** | **References** | Notes |
| :-: | :-: | :-: | :-: |
| Booking | userId | User(id) | Nullable (guest booking allowed) |
| Booking | eventId | Event(id) | Required |

## 8. Data Integrity & Design Notes

- The design follows **3NF** normalization principles. 

- Seat availability is managed via totalSeats and availableSeats fields on the Event table. 

- Guest booking is supported by allowing userId to be null while storing name and email directly on the booking. 

- date field in Events is currently stored as **String** (recommended to change to DateTime in future). 


## 9. Security Considerations

- Passwords must be hashed before storage (e.g., using bcrypt). 

- Prisma protects against SQL injection by default. 

- Implement proper authentication and authorization layers in the backend. 

- Restrict database access using roles and environment variables. 


## 10. Future Improvements (Recommended)

- Add support for multiple ticket types per event (VIP, Regular, Early Bird, etc.) 

- Change Event.date from String to DateTime 

- Add a Payments table for transaction records 

- Add Categories and Reviews/Ratings tables 

- Implement audit logs 

- Add indexes on frequently queried fields (Event.date, Booking.eventId, etc.) 


## 11. Conclusion

The current Bookify database design provides a clean, functional, and scalable foundation for the event booking system. While simpler than some initial proposals, it effectively supports core features including seat management and guest bookings.

