**System Design & Architecture**

# **1. SYSTEM OVERVIEW**

\*\* Bookify is a web-based event booking system designed to allow users to browse events and reserve tickets online. The system also provides administrators with tools to create and manage events\*\*

**The app follows a client server architecture here the frontend communicates with the backend server which interacts with the SQL database.**

# **2. TECHSTACK**

| Component | Technology |
| - | - |
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.Js |
| Database | SQL(via Prisma ORM) |
| Architecture Type | Web Application |


# **3. SYSTEM ARCHITECTURE**

**Frontend Layer**

\*\*The frontend provides the user interface for interacting with the system. Users can: \*\*

- **Browse events**

- \*\*Search and filter events \*\*

- \*\*View event details \*\*

- \*\*Book tickets \*\*

- \*\*Access their profiles \*\*

**Built using HTML, CSS, and JavaScript.**

### **Backend Layer**

**The backend handles:**

- \*\*Business logic \*\*

- \*\*User authentication \*\*

- \*\*Event management \*\*

- \*\*Booking processing \*\*

- \*\*Communication with the database \*\*

**Implemented using Node.js.**

### **Database Layer**

**The SQL database stores:**

- \*\*User information \*\*

- \*\*Event details \*\*

- \*\*Booking records \*\*

- \*\*Ticket information \*\*

**The database ensures persistent storage and retrieval of system data.**

# **4. HIGH LEVEL SYSTEM FLOW**

**User → Frontend → Backend → SQL Database**

**Flow Explanation:**

**User interacts with frontend**

**Frontend sends request to backend**

**Backend processes requests and communicates with the database**

**Database returns requested data**

**Backend sends response to frontend**

**Frontend displays updated info to the user**

# **5. IMPORTANT SYSTEM MODULES**

## **Authentication Module**

Handles:

- User registration

- User login

- Session validation

## Event Management Module

Handles:

- Event creation

- Event editing

- Event deletion

- Event retrieval

## **Booking Module**

Handles:

- Ticket selection

- Booking confirmation

- Booking storage

- Booking history retrieval

## Search & Filter Module

Allows users to:

- Search events by name

- Filter events by category

# 6. DATABASE OVERVIEW

The system uses a relational SQL database with the following core entities:

- Users

- Events

- Bookings

- Tickets

### Entity Relationships

- One user can make multiple bookings

- One event can have multiple bookings

- Each booking belongs to one user and one event


# **7. DESIGN CONSIDERATIONS**

- Minimalist user interface

- Simple and intuitive navigation

- Responsive web design principles

- Separation of frontend, backend, and database responsibilities

# 8. LIMITATIONS

- The application is for academic purposes only

- Real payment processing is not supported

- Real email notifications are not implemented

