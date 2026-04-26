export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  totalSeats: number;
  availableSeats: number;
  price: number;
}

// In-memory data store
export const events: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'A conference for tech enthusiasts',
    date: '2025-08-15',
    location: 'Cape Town',
    totalSeats: 100,
    availableSeats: 100,
    price: 299
  },
  {
    id: '2',
    title: 'Music Festival',
    description: 'A weekend of live music',
    date: '2025-09-20',
    location: 'Johannesburg',
    totalSeats: 500,
    availableSeats: 500,
    price: 150
  }
];
