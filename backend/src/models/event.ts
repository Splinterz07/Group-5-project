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
    title: 'Tech Summit Lagos 2026',
    description: 'A premier conference for tech enthusiasts and professionals across Africa',
    date: '2026-07-15',
    location: 'Eko Convention Centre, Lagos',
    totalSeats: 500,
    availableSeats: 500,
    price: 299
  },
  {
    id: '2',
    title: 'Afrobeats Music Festival 2026',
    description: 'A celebration of African music culture featuring top artists across the continent',
    date: '2026-08-20',
    location: 'Tafawa Balewa Square, Lagos',
    totalSeats: 2000,
    availableSeats: 2000,
    price: 150
  },
  {
    id: '3',
    title: 'Abuja Startup Expo 2026',
    description: 'Connecting African entrepreneurs and investors for a better tomorrow',
    date: '2026-09-10',
    location: 'International Conference Centre, Abuja',
    totalSeats: 300,
    availableSeats: 300,
    price: 50
  }
];
