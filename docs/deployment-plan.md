# Bookify Deployment Plan

## Overview
Bookify is a full-stack event booking application. The backend is deployed on Railway and the frontend is deployed on Vercel.

## Tech Stack
- **Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Frontend:** Next.js, TypeScript
- **Backend Hosting:** Railway
- **Frontend Hosting:** Vercel
- **Database Hosting:** Railway (PostgreSQL)

## Backend Deployment (Railway)
1. Create a free account at railway.app
2. Create a new project and select "Deploy from GitHub repo"
3. Select the Group-5-project repository
4. Set the root directory to `backend`
5. Add the following environment variables:
   - `DATABASE_URL` - PostgreSQL connection string (provided by Railway)
   - `JWT_SECRET` - A secure random string
   - `PORT` - 5000
   - `NODE_ENV` - production

## Frontend Deployment (Vercel)
1. Create a free account at vercel.com
2. Import the Group-5-project repository
3. Set the root directory to `frontend`
4. Add the following environment variable:
   - `NEXT_PUBLIC_API_URL` - The live backend URL from Railway

## Connecting Frontend to Backend
- Replace all `localhost:5000` references in the frontend with `NEXT_PUBLIC_API_URL`
- This ensures the frontend talks to the live backend in production

## Environment Variables Summary
| Variable | Where | Description |
|----------|-------|-------------|
| DATABASE_URL | Railway | PostgreSQL connection string |
| JWT_SECRET | Railway | Secret key for JWT tokens |
| PORT | Railway | Server port |
| NODE_ENV | Railway | Set to "production" |
| NEXT_PUBLIC_API_URL | Vercel | Live backend URL |