export interface Booking {
  id: string;
  therapistId: string;
  therapistName: string;
  therapistRole: string;
  therapistPhoto: string;
  date: string;
  time: string;
  format: "online" | "vor-ort";
  locationAddress?: string;
  status: "confirmed" | "cancelled";
  bookedAt: string;
}

const KEY = "pb_bookings";

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveBooking(booking: Omit<Booking, "id" | "bookedAt">): Booking {
  const all = getBookings();
  const newBooking: Booking = {
    ...booking,
    id: crypto.randomUUID(),
    bookedAt: new Date().toISOString(),
  };
  localStorage.setItem(KEY, JSON.stringify([newBooking, ...all]));
  window.dispatchEvent(new Event("pb_bookings_change"));
  return newBooking;
}

export function cancelBooking(id: string): void {
  const all = getBookings().map(b =>
    b.id === id ? { ...b, status: "cancelled" as const } : b
  );
  localStorage.setItem(KEY, JSON.stringify(all));
  window.dispatchEvent(new Event("pb_bookings_change"));
}

export function getUpcoming(): Booking[] {
  return getBookings().filter(b => b.status === "confirmed");
}

export function getPast(): Booking[] {
  return getBookings().filter(b => b.status === "cancelled");
}
