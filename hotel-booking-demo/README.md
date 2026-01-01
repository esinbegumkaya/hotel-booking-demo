# Hotel Booking Demo (Selenium-friendly)

Simple Hotel Booking demo app designed for Selenium UI automation testing.

Local URLs:
- UI: http://localhost:3000
- Mock API: http://localhost:3001

Requirements:
- Node.js (16+ recommended)

Install and run:

```bash
npm install
npm run api      # starts json-server on port 3001
npm run ui       # serves the static UI on port 3000
# or run both together:
npm run dev
```

Pages:
- Home: `/` (Start Booking)
- Search: `/search.html` (city, checkin, checkout)
- Results: `/results.html` (hotel list)
- Booking: `/booking.html` (enter user details)
- Confirmation: `/confirmation.html` (shows reservation id)

API endpoints (json-server):
- `GET /hotels`
- `POST /bookings`
- `GET /bookings/:id`
- `DELETE /bookings/:id`

Selenium notes:
- All interactive elements include `data-testid` attributes for stable selectors.
- No random DOM or animations.

Deployment
---------

This repo is configured for deployment to Render. The frontend reads the API base URL from the environment variable `VITE_API_URL` at build time.

Render (recommended)
- Create two services in Render or use the provided `render.yaml`.
- API service: point to the `/api` folder, build with `npm install --prefix api`, start with `npm run start --prefix api`.
- UI service (Static Site): set `VITE_API_URL` to your API public URL (for example `https://hotel-booking-demo-api.onrender.com`). Build with `npm install --prefix ui && npm run build --prefix ui` and publish `ui/dist`.

Railway
- Create two services: one for the API (run `npm install` and `npm start` in `/api`) and one for the static site. Set environment variable `VITE_API_URL` for the UI to the API public URL before building.

Local development
- Copy `ui/.env.example` to `ui/.env` and set `VITE_API_URL=http://localhost:3001` if you want to run locally.

Node version
- Compatible with Node 16+. Use Node 18+ for best compatibility.
