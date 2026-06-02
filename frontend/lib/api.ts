const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRole');
};

export const isLoggedIn = () => !!getToken();

export const setUserRole = (role: 'user' | 'organizer') => {
  localStorage.setItem('userRole', role);
};

export const getUserRole = (): 'user' | 'organizer' => {
  if (typeof window === 'undefined') return 'user';
  return (localStorage.getItem('userRole') as 'user' | 'organizer') || 'user';
};

export const isOrganizer = () => getUserRole() === 'organizer';

export const getUserName = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('userName') || '';
};

export const getUserEmail = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('userEmail') || '';
};

export const authFetch = async (path: string, options: RequestInit = {}) => {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  return res;
};

export const login = async (email: string, password: string) => {
  const res = await authFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  setToken(data.token);
  localStorage.setItem('userName', data.name);
  localStorage.setItem('userEmail', email);
  return data;
};

export const register = async (name: string, email: string, password: string) => {
  const res = await authFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
};

export const fetchEvents = async () => {
  const res = await authFetch('/api/events');
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch events');
  return data;
};

export const searchEvents = async (query: string) => {
  const res = await authFetch(`/api/events?search=${encodeURIComponent(query)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to search events');
  return data;
};

export const fetchEvent = async (id: number) => {
  const res = await authFetch(`/api/events/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch event');
  return data;
};

export const fetchBookings = async () => {
  const res = await authFetch('/api/bookings/my-bookings');
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch bookings');
  return data;
};

export const createBooking = async (eventId: number, name: string, email: string, seats: number) => {
  const res = await authFetch('/api/bookings', {
    method: 'POST',
    body: JSON.stringify({ eventId, name, email, seats }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create booking');
  return data;
};

export const cancelBooking = async (id: number) => {
  const res = await authFetch(`/api/bookings/${id}`, { method: 'DELETE' });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to cancel booking');
  return data;
};

export const createEvent = async (eventData: {
  title: string;
  description: string;
  date: string;
  location: string;
  totalSeats: number;
  price: number;
}) => {
  const res = await authFetch('/api/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create event');
  return data;
};