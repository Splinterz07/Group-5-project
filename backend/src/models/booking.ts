export interface Booking {
  id: string;
  eventId: string;
  name: string;
  email: string;
  seats: number;
  createdAt: string;
}

// In-memory data store
export const bookings: Booking[] = [];