const API_BASE = "/api/a1m";

export async function createBooking(data: {
  name: string;
  email: string;
  phone?: string;
  destination: string;
  destinationType?: string;
  guests?: number;
  checkIn?: string;
  checkOut?: string;
  paymentMethod?: string;
  notes?: string;
}) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Greška pri rezervaciji");
  return json;
}

export async function getDestinations(type?: string) {
  const url = type ? `${API_BASE}/destinations?type=${type}` : `${API_BASE}/destinations`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Greška pri učitavanju destinacija");
  return res.json();
}

export async function adminLogin(password: string) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Pogrešna lozinka");
  return json.token as string;
}

export async function getBookings(token: string) {
  const res = await fetch(`${API_BASE}/bookings`, {
    headers: { "x-admin-token": token },
  });
  if (!res.ok) throw new Error("Neautorizovan");
  return res.json();
}

export async function updateBookingStatus(token: string, id: number, status: string) {
  const res = await fetch(`${API_BASE}/bookings/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "x-admin-token": token },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Greška");
  return res.json();
}

export async function deleteBooking(token: string, id: number) {
  const res = await fetch(`${API_BASE}/bookings/${id}`, {
    method: "DELETE",
    headers: { "x-admin-token": token },
  });
  if (!res.ok) throw new Error("Greška");
  return res.json();
}

export async function addDestination(token: string, data: any) {
  const res = await fetch(`${API_BASE}/destinations`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-admin-token": token },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  return json;
}

export async function updateDestination(token: string, id: number, data: any) {
  const res = await fetch(`${API_BASE}/destinations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "x-admin-token": token },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  return json;
}

export async function deleteDestination(token: string, id: number) {
  const res = await fetch(`${API_BASE}/destinations/${id}`, {
    method: "DELETE",
    headers: { "x-admin-token": token },
  });
  if (!res.ok) throw new Error("Greška");
  return res.json();
}
