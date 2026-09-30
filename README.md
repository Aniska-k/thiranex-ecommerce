# Thiranex E-Commerce v2 — Full Stack Working Website

A realistic full-stack e-commerce project for the Thiranex internship. It includes a polished responsive storefront, 40 seeded products, authentication, persistent MongoDB data, cart, checkout, demo payment modes, order tracking, and an admin order/product view.

## Stack
- Frontend: React 18 + Vite + React Router + Lucide
- Backend: Node.js + Express
- Database: MongoDB Atlas (or local MongoDB)
- Authentication: JWT + bcrypt

## Requirements
- Node.js 20+ recommended
- A MongoDB Atlas cluster OR local MongoDB

## 1. Backend setup
Open a VS Code terminal:

```powershell
cd backend
npm install
```

Create `backend/.env` from `.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/thiranex_store?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Seed the store:

```powershell
npm run seed
```

This creates 40 products plus:

Admin: `admin@thiranexstore.com` / `Admin@123`

Customer: `user@thiranexstore.com` / `User@123`

Start API:

```powershell
npm run dev
```

API: http://localhost:5000/api/health

## 2. Frontend setup
Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Included features
- Responsive storefront with hero section and category navigation
- 40 realistic products with image URLs, price, sale price, rating, reviews count, stock and descriptions
- Search, category filters and sorting
- Product detail pages
- Persistent local cart
- Quantity controls and stock validation
- Login/register with JWT
- MongoDB-backed order creation
- Address form
- COD, demo card and demo UPI payment modes (simulation only)
- Coupon `THIRANEX10` for 10% demo discount
- Order history and order tracking timeline
- Stock is reduced after successful order
- Admin order list and status updates
- Admin product list
- Mobile responsive UI

## Important payment note
The payment options labelled Demo Card and Demo UPI are simulated and do not charge real money. For a production deployment, connect a payment gateway such as Razorpay/Stripe and implement its server-side verification/webhooks.

## MongoDB Atlas
Use Atlas → Database → Connect → Drivers → Node.js to copy the connection string. Make sure the Database Access username/password are used, not your Atlas login password. If your password contains special URL characters, URL-encode them.

For development you may allow your IP in Atlas Network Access. For production, restrict network access and use a strong secret.

## Common commands
Backend:
`npm run seed`
`npm run dev`

Frontend:
`npm run dev`
`npm run build`
