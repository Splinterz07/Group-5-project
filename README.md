# Bookify - Event Booking System

A full-stack event booking platform where users can browse events, book tickets, and manage bookings.

## Features

- Browse upcoming events

- View event details

- Book tickets (as guest or registered user)

- Real-time seat availability

- User authentication (Login & Signup)

- Responsive design

## Tech Stack

- Frontend: Next.js 15 (TypeScript + Tailwind CSS)

- Backend: Node.js + Express + TypeScript

- Database: PostgreSQL + Prisma ORM

```
\*\*\`Installation & Setup\`\*\*  
  
  
\*\*\`1. Clone the Repository\`\*\*  
  
  
\`\\\`\\\`\\\`bash\`  
  
\`git clone https://github.com/Splinterz07/Group-5-project.git\`  
  
\`cd Group-5-project\`
```

### 2. Backend Setup

Bash

```
\`cd backend\`  
  
\`npm install\`  
  
  
\`\\\# Copy environment variables\`  
  
\`cp .env.example .env\`
```

Then edit the .env file:

env

```
\`DATABASE\\\_URL="postgresql://yourusername:yourpassword@localhost:5432/bookify"\`  
  
\`PORT=5000\`
```

Run these commands:

Bash

```
\`npx prisma migrate dev\`  
  
\`npx prisma generate\`  
  
\`npm run dev\`
```

> Backend should now be running at \*\*[http://localhost:5000\*\*](http://localhost:5000/)

### 3. Frontend Setup

Bash

```
\`cd ../frontend\`  
  
\`npm install\`  
  
\`npm run dev\`
```

> Frontend should now be running at \*\*[http://localhost:3000\*\*](http://localhost:3000/)

# How to Use Bookify

### For Regular Users (Customers)

1. **Browse Events**

   - Go to the homepage

   - View list of available events

2. **View Event Details**

   - Click on any event card

   - See description, date, location, price, and available seats

3. **Book Tickets**

   - On the event page, enter number of seats you want

   - Fill in your name and email (if not logged in)

   - Click **Book Now**

   - Booking is confirmed and seats are reduced automatically

4. **Login / Signup**

   - Click on Login/Signup to create an account or sign in

   - Logged-in users can see their booking history (coming soon)

# For Admins / Organizers

1. Login with admin credentials (currently handled in backend)

2. Create new events (via API or admin panel — currently in development)

3. Manage existing events (update details, check bookings)

4. Monitor seat availability

> **Note:** Full admin dashboard is planned for future updates.

## Live Demo

   - **Frontend (Client)**: https://group-5-project-kappa.vercel.app .
   - **Backend (API)**: https://group-5-project-production.up.railway.app

> Note: The backend API might take a few seconds to wake up if it's hosted on a free tier (Render, Railway, etc.).

## API Endpoints

| Method | Endpoint | Description |
| - | - | - |
| GET | /api/events | Get all events |
| GET | /api/events/:id | Get single event |
| PUT | /api/events/:id | Update an event |
| GET | /api/bookings | Get all bookings |
| POST | /api/bookings | Create a booking |
| DELETE | /api/bookings/:id | Cancel a booking |


## Project Structure

bookify/ ├── backend/ │   ├── prisma/ │   └── src/ │       ├── routes/ │       ├── models/ │       ├── controllers/ │       ├── lib/ │       └── middleware/ ├── frontend/ │   └── app/ │       ├── home/ │       ├── login/ │       ├── signup/ │       └── profile/ ├── docs/ ├── .gitignore ├── LICENSE └── README.md

# Group 5 Members

- 24120111021 — ASENUGA Emmanuel

- 24120111029 — DELE-LAWAL Momooreoluwa

- 24120111033 — EKPODIKPO Uyohoini

- 24120111043 — FAKAYODE Ayomide

- 24120111053 — MICHAEL-HUSSAINI Philemon

- 24120111059 — NWACHUKWU Chukwubuikem

- 24120111076 — OKENLA Emmanuel

- 24120111103 — Tunde Betty

