# Pizza App – Full‑Stack Monorepo

A modern pizza ordering app with a React (Vite) frontend and a Node.js/Express + MongoDB backend. It supports user auth, custom pizza builder, cart and orders, admin dashboards for menu/inventory/order management, and a simple simulated payment flow.

## Features
- User auth with JWT, protected routes
- Browse pizzas, build custom pizzas, cart + orders
- Admin: dashboard stats, order status updates, menu CRUD, inventory tracking, low‑stock checks
- Simulated payments that decrement inventory on success

## Tech Stack
- Frontend: React, React Router, Axios, Tailwind, Vite
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, Zod, Nodemailer, node‑cron

## Repository Structure

```
client/
  public/
  src/
    assets/
    components/
    pages/
    api.js
    App.jsx
    main.jsx
  package.json
server/
  controllers/
  middlewares/
  models/
  routes/
  utils/
  index.js
  package.json
```

## Quick Start

### Prerequisites
- Node.js 18+
- A MongoDB connection string (Atlas or local)

### Backend (server)
1) Create an env file at `server/.env`:

```
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<a_strong_secret>
# Optional (only if enabling email verification)
MAIL_USER=<gmail_address>
MAIL_PASS=<gmail_app_password>
```

2) Install and run:

```bash
cd server
npm install
# Live reload (configured):
npm start
# Or plain node:
npm run dev
```

The backend listens on http://localhost:3000.

### Frontend (client)
1) Create an env file at `client/.env`:

```
VITE_API_BASE_URL=http://localhost:3000
```

2) Install and run:

```bash
cd client
npm install
npm run dev
```

The app runs on the Vite dev port (typically http://localhost:5173).

## Authentication
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- (Optional) Verify email: `GET /api/auth/verify-email?token=...`

All protected routes expect a header named `token` with a JWT: `token: <jwt>`.

## User Pizza APIs (protected)
- Get all pizzas: `GET /pizza/`
- Create custom pizza: `POST /pizza/custom-pizza`
- My custom pizzas: `GET /pizza/custom/mine`
- Place order: `POST /pizza/order`
- My orders: `GET /pizza/orders/mine`

## Admin APIs (protected)
All admin routes require a JWT whose payload contains `role: "admin"`. New users default to `role: "user"`; set an admin directly in the database as needed.

- Dashboard stats: `GET /admin/stats`
- See all custom pizzas: `GET /admin/custom/all`
- Inventory list: `GET /admin/inventory`
- Add inventory item: `POST /admin/add-item`
- Manual inventory update: `PUT /admin/update/manual/:id`
- View all orders: `GET /admin/all-orders`
- Update order status: `PUT /admin/orders/:id/status`
- Add menu pizza: `POST /admin/new-pizza`
- Update menu pizza (public): `PUT /admin/pizza-update/:id/public`
- Delete menu pizza: `DELETE /admin/pizza/delete/:id`
- Check low stock: `GET /admin/check-inventory`

Header for all protected/admin routes:

```
token: <jwt>
```

## Payments (protected, simulated)
- Process: `POST /api/payment/process` (body: `{ orderId }`)
- Check status: `GET /api/payment/check-status/:orderId`

On successful payment, inventory quantities for the pizza’s base, sauce, cheese, and toppings are decremented.

## Notes & Tips
- Email verification is scaffolded but optional; if enabling, configure `MAIL_USER`/`MAIL_PASS`. The verification link/domain may need to be aligned with your server host/port.
- A cron job pings a Render URL in `server/index.js` to keep a hosted server awake; adjust or remove for local/self‑hosting.
- Admin routes expect the header key `token` (not `Authorization`).

## License
MIT
