# MRMS Frontend (React + Vite)

Frontend for a Medical Record Management System. Roles: doctor, patient, admin.

## Run
```
npm install
cp .env.example .env     # set VITE_API_URL
npm run dev
```

## Important
There is NO demo mode. Registration, login and records only work once a backend exists.
Without it, pages show a "Cannot reach the server" message. This is intentional.

## Connect the backend
1. Set `VITE_API_URL` in `.env` (default `http://localhost:5000/api`).
2. In Express: `cors({ origin: 'http://localhost:5173', credentials: true })` and `cookie-parser`.
3. Login must set an HTTP-only, SameSite cookie. The frontend uses `withCredentials: true`.
4. Implement the endpoints used in `src/services/`. Beyond your list, the UI also calls:
   `PUT /api/auth/me`, `PUT /api/auth/password`, `PUT /api/admin/users/:id/status`.
   Responses: login and `/auth/me` return `{ user: { role, fullName, email, ... } }`; list endpoints return arrays;
   `/admin/stats` returns `{ doctors, patients, appointments }`.

## Backend rules (enforce on the server, never only in the UI)
- Admin accounts are created by a seed script, never by public registration.
- Hash passwords (bcrypt), validate all input, rate-limit login.
- Check role AND record ownership on every request (doctor-patient assignment, patient = self).
- Admin endpoints return account data only, not medical records.
- Validate upload type/size and serve files only through authorized routes.
- Never log passwords, tokens or medical data.
